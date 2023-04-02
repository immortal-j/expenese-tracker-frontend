export class User {
  public id: string | number | null;
  public name: string | number | null;
  public email: string | number | null;
  public budget: string | number | null;
  public totalspent: string | number | null;
  constructor(data: {
    _id: string | number | null;
    name: string | number | null;
    email: string | number | null;
    budget: string | number | null;
    totalspent: string | number | null;
  }) {
    this.id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.budget = data.budget;
    this.totalspent = data.totalspent;
  }
}