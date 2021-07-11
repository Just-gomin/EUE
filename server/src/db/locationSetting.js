import fs from "fs";
import db from "./index";

export const setLocTables = () => {
  // File Read
  let originData = fs.readFileSync("data/admAddressCode.csv", "utf8");

  // Separate Data & Input Data
  let sepData = originData.split("\r\n");
  let doeCodeSet = new Set();
  let sggCodeSet = new Set();

  let doeList = [];
  let sggList = [];
  let emdList = [];

  console.log("Start Location data insertion...");

  sepData.forEach(async (line) => {
    line = line.replace(/\s/g, "");
    let addr = line.split(",");

    // Get Local Codes and Names
    const doeCode = Number(addr[0]);
    let doeName = addr[1];
    doeName = doeName.replace(/\s/g, "");

    const sggCode = Number(addr[2]);
    let sggName = addr[3];
    sggName = sggName.replace(/\s/g, "");

    const emdCode = Number(addr[4]);
    let emdName = addr[5];
    emdName = emdName.replace(/\s/g, "");

    // Save Loc Info to array.
    if (!doeCodeSet.has(doeCode)) {
      doeCodeSet.add(doeCode);
      doeList.push({ code_doe: doeCode, name_doe: doeName });
    }

    if (!sggCodeSet.has(sggCode)) {
      sggCodeSet.add(sggCode);
      sggList.push({
        code_sgg: sggCode,
        name_sgg: sggName,
        code_doe: doeCode,
      });
    }

    emdList.push({
      code_emd: emdCode,
      name_emd: emdName,
      code_doe: doeCode,
      code_sgg: sggCode,
    });
  });

  console.log("Inserting Location Data...");

  // Insert to DB.
  doeList.map(async (node) => {
    await db.Doe.create(node, { logging: false });
  });

  sggList.map(async (node) => {
    await db.Sgg.create(node, { logging: false });
  });

  emdList.map(async (node) => {
    await db.Emd.create(node, { logging: false });
  });

  console.log("Finish the insertion!");
};

export default setLocTables;
