import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceModel } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { DevicesDetailComponent } from '../devices-detail/devices-detail.component';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns = ['connected', 'location', 'updated_at', 'actions'];
  itemsDevicesLength = 0;
  devicesPageOptions = [10, 25, 50];
  paginatorValue = {
    pageSize: 10,
    pageIndex: 0
  };
  devicesSource = new MatTableDataSource();
  devices: DeviceModel[] = [];

  filterForm!: FormGroup;
  filter = {
    location: '',
    parentLocation: '',
    connected: false
  }
  isLoading: boolean = false;
  thereAreFilters: boolean = false;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.getDevices();
  }

  ngAfterViewInit (){
    this.devicesSource.sort = this.sort;
    this.devicesSource.paginator = this.paginator;
  }

  initForms() {
    this.filterForm = this.fb.group({
      location: [this.filter.location, [Validators.maxLength(3), Validators.pattern('[0-9]+')]],
      parentLocation: [this.filter.parentLocation, [Validators.maxLength(3), Validators.pattern('[0-9]+')]],
      connected: [this.filter.connected, []],
    });
  }

  getDevices() {
    let location = (this.filterForm.get('location')?.value ) ?? '';
    let parentLocation = (this.filterForm.get('parentLocation')?.value ) ?? '';
    let connected = (this.filterForm.get('connected')?.value) ? this.filterForm.get('connected')?.value : '';

    if(location != '' || parentLocation != '' || connected != '') {
      this.thereAreFilters = true;
    }

    let params = {
      location: location,
      parentLocation: parentLocation,
      connected: connected
    };

    this.isLoading = true;
    this.deviceService.getDevices(params).subscribe(
      data => {
        if(!data || data.errors) {
            this.snackbar.open("There was an error trying to load Devices. Please try again later.",'Dismiss',{
              verticalPosition: 'top'
            });
        } else {
          this.devices = [...data];
          this.itemsDevicesLength = this.devices.length;
          this.devicesSource.data = [];
          this.devicesSource.data = [...this.devices];
        }
        this.isLoading = false;
      },
      (error) => {
        if(error.error && error.error.msg !== ''){
          this.snackbar.open(error.error.msg, 'Dismiss',{
            verticalPosition: 'top'
          });
        } else {
          this.snackbar.open("There was an error trying to load Devices. Please try again later.",'Dismiss',{
            verticalPosition: 'top'
          });
        }
        this.isLoading = false;
      }
    );

  }

  setPaginatorValue(event: any) {
    this.paginatorValue = event;
    this.paginatorValue.pageSize = event.pageSize;
  }

  onFilterClear() {
    this.filterForm.reset();
    this.getDevices();
    this.paginator.firstPage();
    this.thereAreFilters = false;
  }

  onFilterChange() {
    this.getDevices();
    this.paginator.firstPage();
  }

  viewDetail(element: any){
    const dialogDeviceDetail = this.dialog.open(DevicesDetailComponent, {
      data: { device: element },
      height: '96%',
      width: '90%',
      ariaLabel: 'Device detail Dialog',
      panelClass: 'custom-overlay-pane-class'
    });
    dialogDeviceDetail.afterClosed().subscribe(res => {
      if(!res) {
        return;
      } 
    })
  }

}
