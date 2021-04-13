import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { BikeService } from '../bike.service';

export class Bike {
  id: number;
  marca: string;
  modelo: string;
  status = "disponível";
}

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'marca', 'modelo', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Bike>();

  constructor(private service: BikeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getBikes().subscribe(bikes => this.dataSource.data = bikes);
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(MngBikeDialog, {
      width: '750px',
      data: new Bike()
    });
    
    dialogRef.afterClosed().subscribe(bike => {
      this.service.adicionar(bike).subscribe(bikeId => {
        this.service.getBike(bikeId).subscribe(newBike => {
          this.dataSource.data = this.dataSource.data.concat(newBike);
        });
      });
    })
  }

  openEditDialog(bike: Bike): void {
    const dialogRef = this.dialog.open(MngBikeDialog, {
      width: '750px',
      data: bike
    });
    
    dialogRef.afterClosed().subscribe(bike => {
      this.service.editar(bike).subscribe(_ => {
        this.dataSource.data = this.dataSource.data.map(oldBike => {
          if (oldBike.id == bike.id) return bike;
          else return oldBike
        });
      });
    })
  }

  excluir(bike: Bike): void {
    this.service.remover(bike.id).subscribe(_ => {
      this.dataSource.data = this.dataSource.data.filter(oldBike => oldBike.id != bike.id);
    })
  }
}

@Component({
  selector: 'dialog-mng-bike',
  templateUrl: 'dialog-mng-bike.html'
})
export class MngBikeDialog {

  constructor(public dialogRef: MatDialogRef<MngBikeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Bike) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
