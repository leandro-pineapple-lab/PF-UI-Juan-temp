import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PictureModel } from 'src/app/models/template/picture.model';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  titleFilter: string = '';
  picturesList: PictureModel[] = [];
  newPicture: PictureModel = new PictureModel();
  selectedPicture: PictureModel = new PictureModel();
  tooltipTop = 'top';
  closeResult: string = "";

  constructor(private templateService: TemplateService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getPictures();
  }

  async getPictures(){
    (await this.templateService.getPictures(this.titleFilter)).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.picturesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addPicture(){
    let selectedPicture: any = (<HTMLInputElement>document.getElementById('fUploadPicture'))?.files?.item(0);
    
    if (selectedPicture === null){
      this.toastr.error("Please select a File.", 'Error');
      return;
    }
    
    if (this.newPicture.title.trim() === ""){
      this.toastr.error("Please enter a title for the new Picture.", 'Error');
      return;
    }

    this.newPicture.file = new FormData();
    this.newPicture.file.append(this.newPicture.title, selectedPicture, selectedPicture.name);

    (await this.templateService.addPicture(this.newPicture)).subscribe({
      next: (response: any) => {
        this.getPictures();
        this.newPicture = new PictureModel();
        this.toastr.success("Picture successfully created", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async deletePicture(){
    (await this.templateService.deletePicture(this.selectedPicture.seq)).subscribe({
      next: (response: any) => {
        if (!response.hasErrors){
          this.getPictures();
          this.selectedPicture = new PictureModel();
          this.toastr.success("Picture successfully deleted", 'Success');
          this.modalService.dismissAll();
        }else{
          this.toastr.error(response.errorMessage, 'Error');
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async searchPictures(){
    await this.getPictures();
  }

  openDeletePictureConfirmationModal(pictureToDeleteModal: any, picture: PictureModel) {
    this.selectedPicture = picture;
    this.modalService.open(pictureToDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async downloadPicture(seq: number, fileName: string){
    (await this.templateService.downloadFile(seq)).subscribe({
      next: (response: any) => {
        let downloadURL = window.URL.createObjectURL(response.body);
        let downloadFileName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = downloadFileName;
        link.click();
      },
      error: (e: any) => {
        this.toastr.error("The selected image does not exists", 'Error');
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
