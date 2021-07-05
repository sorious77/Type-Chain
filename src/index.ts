class Human {
  public name: string;
  public age: number;
  public gender: string;

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

//const person = { name: "yunobro", age: 25, gender: "female" };

const yun = new Human("yun", 25, "female");

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, ${person.gender}`;
};

console.log(sayHi(yun));

export {};
