const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
/* eslint-disable no-undef */
describe("To do list test suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo0",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add one to-do", () => {
    const todoCount = all.length;
    add({
      title: "Test todo1",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoCount + 1);
  });
  test("Should mark a to-do as Complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should retrieve overdue items", () => {
    let overduee = overdue();
    let count = overduee.length;
    add({
      title: "Test todo2",
      completed: false,
      dueDate: yesterday,
    });
    overduee = overdue();
    expect(overduee.length).toBe(count + 1);
  });
  test("Should retrieve due today items", () => {
    let toduee = dueToday();
    let count = toduee.length;
    add({
      title: "Test todo3",
      completed: false,
      dueDate: today,
    });
    toduee = dueToday();
    expect(toduee.length).toBe(count + 1);
  });
  test("Should retrieve due later items", () => {
    let tomoduee = dueLater();
    let count = tomoduee.length;
    add({
      title: "Test todo4",
      completed: false,
      dueDate: tomorrow,
    });
    tomoduee = dueLater();
    expect(tomoduee.length).toBe(count + 1);
  });
});
