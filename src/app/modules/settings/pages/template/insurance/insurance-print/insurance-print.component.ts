import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InsuranceCompanyTemplateModel } from 'src/app/models/template/insurance/insuranceCompanyTemplate.model';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-insurance-print',
  templateUrl: './insurance-print.component.html',
  styleUrls: ['./insurance-print.component.scss']
})
export class InsurancePrintComponent implements OnInit {

  insuranceTemplate: InsuranceCompanyTemplateModel = new InsuranceCompanyTemplateModel();
  insuranceTemplates: InsuranceCompanyTemplateModel[] = [];
  onInsuranceTemplateChange: Subscription;

  constructor(private titleService: Title, private templateService: TemplateService, private toastr: ToastrService, private route: ActivatedRoute) {
    this.titleService.setTitle("Insurance Template");
  }

  ngOnInit(): void {
    const templateInformation = localStorage.getItem("insuranceTemplate") ?? "";
    this.insuranceTemplate = JSON.parse(templateInformation);
    this.insuranceTemplate.allowable = Object.values(this.insuranceTemplate.allowable).some(x => x !== null) ? this.insuranceTemplate.allowable : null as any;
    this.insuranceTemplate.coverage.benefitsPhone = null as any;
    this.insuranceTemplate.coverage.preCertPhone = null as any;
    this.insuranceTemplate.coverage.preDFax = null as any;
    this.insuranceTemplate.coverage.bariatricCoverage = null as any;
    this.insuranceTemplate.coverage.oonBariatricBenefits = null as any;
    this.insuranceTemplate.coverage.benefitsPhone = null as any;
    this.insuranceTemplate.coverage.coeRequired = null as any;
    this.insuranceTemplate.coverage.isDeductibleAppliedToOOP = null as any;
    this.insuranceTemplate.coverage.notes = null as any;
    this.insuranceTemplate.coverage = Object.values(this.insuranceTemplate.coverage).some(x => x !== null && x != "") ? this.insuranceTemplate.coverage : null as any;
    window.print();
  }

  ngOnDestroy(){
    if (localStorage.getItem("insuranceTemplate")){
      localStorage.removeItem("insuranceTemplate");
    }
  }
}
