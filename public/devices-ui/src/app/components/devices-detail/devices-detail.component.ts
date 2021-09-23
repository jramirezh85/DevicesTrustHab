import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModel } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.scss']
})
export class DevicesDetailComponent implements OnInit, AfterViewInit {

  device!: DeviceModel;
  
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  displayedColumns = ['connected', 'mac_address', 'updated_at'];
  itemsDevicesLength = 0;
  devicesPageOptions = [10, 25, 50];
  paginatorValue = {
    pageSize: 10,
    pageIndex: 0
  };
  devicesSource = new MatTableDataSource();
  devices: DeviceModel[] = [];
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.device = this.data.device;
    this.getDevicesBySameLocation();
  }

  ngAfterViewInit (){
    this.devicesSource.sort = this.sort;
    this.devicesSource.paginator = this.paginator;
  }

  getDevicesBySameLocation() {
    this.isLoading = true;
    this.deviceService.getDevicesByLocation(this.device.location).subscribe(
      data => {
        if(!data || data.errors) {
          this.devices = [];
          this.itemsDevicesLength = 0;
        } else {
          this.devices = [...data];
          this.itemsDevicesLength = this.devices.length;
          this.devicesSource.data = [];
          this.devicesSource.data = [...this.devices];
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.devices = [];
        this.itemsDevicesLength = 0;
      }
    );
  }


  setPaginatorValue(event: any) {
    this.paginatorValue = event;
    this.paginatorValue.pageSize = event.pageSize;
  }
  
}
