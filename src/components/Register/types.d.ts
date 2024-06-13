interface Hair {
  color: string;
  type: string;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
}

export interface User {
  firstName: string;
  lastName: string;
  maidenName: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: Date | null;
  image: string;
  bloodGroup: string;
  height: string;
  weight: string;
  eyeColor: string;
  hair: Hair;
  address: Address;
  university: string;
  bank: Bank;
  company: Company;
  role: string;
}

