import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Pipe, PipeTransform } from '@angular/core';


interface FoodNode{
name:string;
type:string;
urlp:string;
headername:string;
children?:FoodNode[];
}

interface ExampleFlatNode{
  expandable:boolean;
  name:string;
  type:string;
  urlp:string;
  headername:string;
  level:number;
}
const TREE_DATA: FoodNode[] = require("src/assets/data.json");
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit,PipeTransform {

  @Pipe({ name: 'safe'})
 public mysrc = 'https://app.powerbi.com/reportEmbed?reportId=3bbb5916-832c-4970-819a-2835861e7c20&autoAuth=true&ctid=127fa96e-00b4-429e-95f9-72c2828437a4';
 safeUrl: SafeResourceUrl | undefined;
 public headername = "Header Name Comes Here";
  constructor(private httpClient: HttpClient,private sanitizer: DomSanitizer) { 
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mysrc);
    this.dataSource.data = TREE_DATA;
  }

  transform(url: string) {
    console.log( "Santizer URL" + url)
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  logNode(node:FoodNode){

    
if (this.mysrc !== node.urlp) {
    this.mysrc = node.urlp;
  }
  if (this.headername !== node.headername) {
    this.headername = node.headername;
  }
 
    console.log(node.name);
    console.log(node.type);
    console.log("Clicked");
    console.log(this.mysrc);
   
    this.safeUrl = this.transform(this.mysrc);
    console.log(this.safeUrl);
  }

  // onLoad(iframe: any){
  //   console.log("iframe content loaded");
  //   }

    
 ngOnInit(){
    this.httpClient.get("assets/data.json").subscribe(data =>{
     // console.log(data);
      
      //this.products = data;
    })
  }
private _transformer = (node: FoodNode, level: number) => {
  return {
    expandable: !!node.children && node.children.length > 0, name: node.name,type:node.type, level:level,urlp:node.urlp,headername:node.headername

  };
};

treeControl = new FlatTreeControl<ExampleFlatNode>(
  node=>node.level,
  node=>node.expandable
);
treeFlattener = new MatTreeFlattener(
  this._transformer,
  node=>node.level,
  node=>node.expandable,
  node=>node.children
);

dataSource= new MatTreeFlatDataSource(
  this.treeControl,this.treeFlattener
)

hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
