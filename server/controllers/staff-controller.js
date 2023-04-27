const Staff = require("../models/staff-model");

// ? get ข้อมูลออกมาทั้งหมด
exports.staffAll = async (req, res) => {
  // ? .sort({ _id: -1 }) คือการเรียงจากมากไปน้อยหรือก็คือการเอาข้อมูลที่เพิ่งถูกเพิมขึ้นมาโชว์ก่อน
  const staff = await Staff.find().sort({ _id: -1 });

  console.log(staff);

  res.status(200).json([{ staff }]);
};

// ? findById หาจาก Id
exports.showbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);

    if (!staff) {
      throw new Error("ไม่พบข้อมูลพนักงาน");
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "เกิดข้อผิดพลาด" + error.message,
      },
    });
  }
};

// ? delete
exports.deletestaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.deleteOne({ _id: id });

    if (staff.deletedCount === 0) {
      throw new Error("ไม่สามารถลบข้อมูลได้");
    } else {
      res.status(201).json({
        message: "ลบข้อมูลสำเร็จ",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "เกิดข้อผิดพลาด" + error.message,
    });
  }
};

exports.insert = async (req, res) => {
  const { name, salary } = req.body;

  // ? เพิ่มข้อมูลแบบทั้งหมด
  let staff = new Staff(req.body);

  // ? เพิ่มข้อมูลแบบเสือกแยกรายตัว
  // let staff = new Staff({
  //     name: name,
  //     salary: salary,
  // })

  await staff.save();

  res.status(200).json({
    msg: "Insert data success",
  });

  console.log(staff);
};

exports.staffUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    // ? Update แบบที่ 1
    // const staff = await Staff.findById(id);
    // staff.name = name;
    // staff.salary = salary;
    // await staff.save();

    // ? Update แบบที่ 2
    // const staff = await Staff.findByIdAndUpdate(id, {
    //     name: name,
    //     salary: salary
    // });
    // await staff.save();
    // console.log(staff);

    // ? แบบที่ 3
    const staff = await Staff.updateOne(
      { _id: id },
      {
        name: name,
        salary: salary,
      }
    );
    console.log(staff);
    if (staff.modifiedCount === 0) {
      throw new Error("ไม่สามารถอัพเดทค่าได้");
    } else {
      res.status(201).json({
        msg: "แก้ไขข้อมูลเรียบร้อย",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "ข้อมูลผิดพลาด" + error.message,
    });
  }
};
