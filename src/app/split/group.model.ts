export class Group{
    constructor(public groupid:string,public name:string,public members:Map<string,number>,public transactions:any){};
}