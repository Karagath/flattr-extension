"use strict";

const fs = require("fs");
const path = require("path");
const Mocha = require("mocha");
const packageJson = require("../package.json");
const {getArgs} = require("../build/cli");

const testsDir = path.join(__dirname, "tests");

let args = getArgs({
  boolean: ["nobuilds"],
  string: ["exclude", "include"]
});

let reExcluded = new RegExp(args.exclude);
let reIncluded = new RegExp(args.include);

function getMochaOpts()
{
  return packageJson.mocha;
}

function run()
{
  let mochaOpts = getMochaOpts();

  return new Promise((resolve, reject) =>
  {
    const mochaRunner = new Mocha(mochaOpts);

    fs.readdir(testsDir, (err, files) =>
    {
      for (let file of files)
      {
        if (args.include && !reIncluded.test(file))
          continue;

        if (args.exclude && reExcluded.test(file))
          continue;

        if (args.nobuilds && file == "build.js")
          continue;

        mochaRunner.addFile(path.join(testsDir, file));
      }

      process.env.FP_BUILD_MODE = "test";
      mochaRunner.run((failures) =>
      {
        if (failures)
        {
          reject(failures);
        }

        delete process.env.FP_BUILD_MODE;
        resolve();
      });
    });
  });
}
exports.run = run;
