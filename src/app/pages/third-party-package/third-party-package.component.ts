import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-third-party-package',
  templateUrl: './third-party-package.component.html',
  styleUrls: ['./third-party-package.component.scss']
})
export class ThirdPartyPackageComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}
  showSuccess() {
    this.toastr.success('操作成功！', '成功');
  }
}
