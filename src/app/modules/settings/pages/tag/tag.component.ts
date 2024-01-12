import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { TagModel } from 'src/app/models/practice/tag.model';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class SettingsTagComponent implements OnInit {

  searchTagFilter: string = "";
  originalTagsList: TagModel[] = [];
  tagsList: TagModel[] = [];
  newTag: TagModel = new TagModel();
  selectedTag: TagModel = new TagModel();
  closeResult: string = '';
  pagination: PagingModel = new PagingModel();
  showingFrom = 1;
  showingTo = this.pagination.tableSize;

  constructor(private tagService: TagService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getTags();
  }

  async getTags() {
    (await this.tagService.getTags(this.pagination)).subscribe({
      next: (response: any) => {
        this.tagsList = response.results;
        this.originalTagsList = response.results;
        this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
        this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ? this.pagination.totalNumberOfRecords :
                        (this.pagination.page * this.pagination.tableSize);
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addTag() {
    if (!this.newTag.isValid()){
      this.toastr.error('Name is Required.', 'Error');
      return;
    }
    (await this.tagService.addTag(this.newTag)).subscribe({
      next: (response: any) => {
        this.searchTagFilter = "";
        this.newTag = new TagModel();
        this.toastr.success('Tag successfully created.', 'Success');
        this.getTags();
      },
      error: (e: any) => {
        if (e.error && e.error.errors){
          if (e.error.errors.Name){
            this.toastr.error(e.error.errors.Name, 'Error');
          }
        }else{
          this.toastr.error(e.error, 'Error', {
            timeOut: 2000
          });
        }
      }
    });
  }

  openDeleteTagConfirmationModal(tagToDeleteModal: any, tag: TagModel) {
    this.selectedTag = tag;
    this.modalService.open(tagToDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  async deleteTag() {
    (await this.tagService.deleteTag(this.selectedTag.name)).subscribe({
      next: (response: any) => {
        this.selectedTag = new TagModel();
        this.toastr.success('Tag successfully deleted.', 'Success');
        this.getTags();
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error', {
          timeOut: 2000
        });
      }
    });
  }

  searchTag(){
    if (this.searchTagFilter.trim().length === 0){
      this.tagsList = this.originalTagsList;
      return;
    }
    this.tagsList = this.originalTagsList.filter(x => x.name.trim().toLowerCase().includes(this.searchTagFilter.trim().toLowerCase()));
  }

  async onTableDataChange(event: any) {
    console.log("🚀 ~ file: tag.component.ts:116 ~ SettingsTagComponent ~ onTableDataChange ~ event", event)
    this.showingTo = (event * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (event * this.pagination.tableSize);
    this.showingFrom = event == 1 ? 1 : ((event - 1) * (this.pagination.tableSize)) + 1;
    this.pagination.page = event;
    await this.getTags();
  }

  async onTableSizeChange(event: any) {
    this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (this.pagination.page * this.pagination.tableSize);
    this.showingFrom = this.pagination.page == 1 ? 1 : ((this.pagination.page - 1) * (this.pagination.tableSize)) + 1;
    await this.getTags();
  }

}
