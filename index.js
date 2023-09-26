#!/usr/bin/env node

import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";

const program = new Command();

const questions = [
  { type: "input", name: "title", message: "Enter course title : " },
  { type: "number", name: "price", message: "Enter course price : " },
];

const filePath = "./courses.json";

program
  .name("course-manager")
  .description("CLI to make courses")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("Add a course")
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      if (fs.existsSync(filePath)) {
        let fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        fileContent.push(answers);
        fs.writeFileSync(filePath, JSON.stringify(fileContent), "utf-8");
        console.log("course added successfully");
      } else {
        fs.writeFileSync(filePath, JSON.stringify([answers]), "utf-8");
        console.log("course added successfully");
      }
    });
  });

program
  .command("list")
  .alias("l")
  .description("list all courses")
  .action(() => {
    let courses = fs.readFileSync(filePath, "utf-8");
    console.table(JSON.parse(courses));
  });

program.parse(process.argv);
