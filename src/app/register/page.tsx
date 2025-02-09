// Code: About page
"use client";

import { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

interface formProps {
  role: string;
  name: string;
  stdID: string;
  email: string;
  faculty: string;
  year: string;
  phoneNum: string;
  foodAllergies: string;
  knowledge: string;
  reason: string;
  expectation: string;
  hearFrom: string;
  suggestions: string;
}

interface SmoothScrollProps {
  id: string;
}

export default function RegisterForm() {
  const [form, setForm] = useState<formProps>({
    role: "",
    name: "",
    stdID: "",
    email: "",
    faculty: "",
    year: "",
    phoneNum: "",
    foodAllergies: "",
    knowledge: "",
    reason: "",
    expectation: "",
    hearFrom: "",
    suggestions: "",
  });

  const handleSmoothScroll = ({ id }: SmoothScrollProps): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[80%] max-w-96">
        <h1 className="text-2xl font-bold py-5">ลงทะเบียน</h1>
        <form
          action=""
          method="post"
          className="flex flex-row overflow-x-scroll snap-x snap-mandatory border border-gray-600 rounded-xl"
        >
          <div
            id="form1"
            className="flex flex-col gap-5 flex-shrink-0 w-full justify-between"
          >
            <div className="flex flex-col gap-5 w-full p-10 snap-center" >
              <label htmlFor="role">คำนำหน้า</label>
                <select
                name="role"
                id="role"
                className="bg-input-bg text-input-text border border-gray-600"
                onChange={(e) => {
                  const selectedRole = e.target.value;
                  setForm({ ...form, role: selectedRole });
                  console.log(e.target.value);
                }}
                defaultValue=""
                required
                >
                <option value="" disabled>
                  เลือก
                </option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                </select>
              <label htmlFor="name">ชื่อ</label>
              <input
                name="name"
                type="text"
                placeholder="สมชาย ใจดี"
                className="border border-gray-700"
                onChange={(e) => {
                  const name = e.target.value;
                  setForm({ ...form, name: name });
                  console.log(e.target.value);
                }}
                required
              />
              <label htmlFor="stdID">รหัสนิสิต</label>
              <input
                name="stdID"
                type="text"
                placeholder="6530XXXXXX"
                className="border border-gray-700"
                onChange={(e) => {
                  const stdID = e.target.value;
                  setForm({ ...form, stdID: stdID });
                  console.log(e.target.value);
                }}
                required
              />
              <label htmlFor="email">อีเมล</label>
              <input
                name="email"
                type="email"
                placeholder="example.ex@ku.th"
                className="border border-gray-700"
                onChange={(e) => {
                  const email = e.target.value;
                  setForm({ ...form, email: email });
                  console.log(e.target.value);
                }}
                required
              />
            </div>
            <button
              type="button"
              className="bg-primary hover:bg-button-hover text-white py-2 rounded-xl m-10 flex flex-row justify-center items-center gap-2"
              onClick={() => {
                handleSmoothScroll({ id: "form2" });
              }}
            >
              ต่อไป <GrLinkNext />
            </button>
          </div>
          <div
            id="form2"
            className="flex flex-col justify-between flex-shrink-0 w-full snap-center"
          >
            <div className="flex flex-col gap-5 w-full p-10">
              <label htmlFor="faculty">คณะ</label>
              <select
                name="faculty"
                id="faculty"
                className="bg-input-bg text-input-text border border-gray-600"
                onChange={(e) => {
                  const faculty = e.target.value;
                  setForm({ ...form, faculty: faculty });
                  console.log(e.target.value);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  เลือก
                </option>
                <option value="วิศวกรรมศาสตร์">วิศวกรรมศาสตร์</option>
                <option value="วืทยาการจัดการ">วืทยาการจัดการ</option>
                <option value="วืทยาศาสตร์">วืทยาศาสตร์</option>
                <option value="เศรษฐศาสตร์">เศรษฐศาสตร์</option>
                <option value="พาณิชยนาวีนานาชาติ">
                  พาณิชยนาวีนานาชาติ
                </option>
              </select>
              <label htmlFor="year">ชั้นปี</label>
              <select
                name="year"
                id="year"
                className="bg-input-bg text-input-text border border-gray-600"
                onChange={(e) => {
                  const year = e.target.value;
                  setForm({ ...form, year: year });
                  console.log(e.target.value);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  เลือก
                </option>
                <option value="ปี 1">ปี 1</option>
                <option value="ปี 2">ปี 2</option>
                <option value="ปี 3">ปี 3</option>
                <option value="ปี 4">ปี 4</option>
              </select>
              <label htmlFor="phoneNum">เบอร์ติดต่อ</label>
              <input
                name="phoneNum"
                type="text"
                placeholder="081xxxxxxx"
                className="border border-gray-700"
                onChange={(e) => {
                  const phoneNum = e.target.value;
                  setForm({ ...form, phoneNum: phoneNum });
                  console.log(e.target.value);
                }}
              />
              <label htmlFor="foodAllergies">แพ้อาหารหรือไม่</label>
              <input
                name="foodAllergies"
                type="text"
                placeholder="ex. แพ้กุ้ง, -"
                className="border border-gray-700"
                onChange={(e) => {
                  const foodAllergies = e.target.value;
                  setForm({ ...form, foodAllergies: foodAllergies });
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row justify-between h-fit m-10">
              <button
                type="button"
                className="bg-accent hover:bg-[#590B8E] text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  handleSmoothScroll({ id: "form1" });
                }}
              >
                <GrLinkPrevious /> กลับ
              </button>
              <button
                type="button"
                className="bg-primary hover:bg-button-hover text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  handleSmoothScroll({ id: "form3" });
                }}
              >
                ต่อไป <GrLinkNext />
              </button>
            </div>
          </div>
          <div
            id="form3"
            className="flex flex-col justify-between flex-shrink-0 w-full snap-center"
          >
            <div className="flex flex-col gap-5 w-full p-10">
              <label htmlFor="knowledge">ระดับความรู้เกี่ยวกับ Python</label>
              <select
                name="knowledge"
                id="knowledge"
                className="bg-input-bg text-input-text border border-gray-600"
                onChange={(e) => {
                  const knowledge = e.target.value;
                  setForm({ ...form, knowledge: knowledge });
                  console.log(e.target.value);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  เลือก
                </option>
                <option value="ไม่เคยเรียน">ไม่เคยเรียน</option>
                <option value="พื่นฐาน">พื่นฐาน</option>
                <option value="ระดับกลาง">ระดับกลาง</option>
                <option value="ขั้นสูง">ขั้นสูง</option>
              </select>
              <label htmlFor="reason">เหตุผลที่สนใจเข้าร่วมอบรม</label>
              <input
                name="reason"
                type="text"
                placeholder="ex.เพื่อพัฒนาทักษะ "
                className="border border-gray-700"
                onChange={(e) => {
                  const reason = e.target.value;
                  setForm({ ...form, reason: reason });
                  console.log(e.target.value);
                }}
              />
              <label htmlFor="expectation">คาดหวังอะไรจากการอบรมครั้งนี้</label>
              <input
                name="expectation"
                type="text"
                placeholder="ex. อยากเรียนรู้เกี่ยวกับ Python"
                className="border border-gray-700"
                onChange={(e) => {
                  const expectation = e.target.value;
                  setForm({ ...form, expectation: expectation });
                  console.log(e.target.value);
                }}
              />
              <label htmlFor="hearFrom">ทราบข่าวการอบรมจากช่องทางใด?</label>
              <input
                name="hearFrom"
                type="text"
                placeholder="ex. จากเพื่อน, facebook, ig"
                className="border border-gray-700"
                onChange={(e) => {
                  const hearFrom = e.target.value;
                  setForm({ ...form, hearFrom: hearFrom });
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row justify-between h-fit m-10">
              <button
                type="button"
                className="bg-accent hover:bg-[#590B8E] text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  handleSmoothScroll({ id: "form2" });
                }}
              >
                <GrLinkPrevious /> กลับ
              </button>
              <button
                type="button"
                className="bg-primary hover:bg-button-hover text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  handleSmoothScroll({ id: "form4" });
                }}
              >
                ต่อไป <GrLinkNext />
              </button>
            </div>
          </div>
          <div
            id="form4"
            className="flex flex-col justify-between flex-shrink-0 w-full snap-center"
          >
            <div className="flex flex-col gap-5 w-full p-10">
              <label htmlFor="suggestions">มีคำถามเพิ่มเติมหรือข้อเสนอแนะหรือไม่?</label>
              <input
                name="suggestions"
                type="text"
                placeholder="ex. -"
                className="border border-gray-700"
                onChange={(e) => {
                  const suggestions = e.target.value;
                  setForm({ ...form, suggestions: suggestions });
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row justify-between h-fit m-10">
              <button
                type="button"
                className="bg-accent hover:bg-[#590B8E] text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  handleSmoothScroll({ id: "form3" });
                }}
              >
                <GrLinkPrevious /> กลับ
              </button>
              <button
                type="button"
                className="bg-primary hover:bg-button-hover text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  handleSmoothScroll({ id: "form5" });
                }}
              >
                ต่อไป <GrLinkNext />
              </button>
            </div>
          </div>
          <div
            id="form5"
            className="flex flex-col justify-between flex-shrink-0 w-full snap-center"
          >
            <div className="flex flex-col gap-5 w-full p-10">
              <label htmlFor="secret">รหัสลับ</label>
              <input
                name="secret"
                type="text"
                placeholder="??????"
                className="border border-gray-700"
                onChange={(e) => {
                  const suggestions = e.target.value;
                  setForm({ ...form, suggestions: suggestions });
                  console.log(e.target.value);
                }}
              />
              <h1>หารหัสลับยังไง ?</h1>
              <h2>- เล่น POP CAT ให้ถึง 2000 แต้ม</h2>
              <h2>- นำรหัสลับที่ได้มาใส่</h2>
                <Link href="/secret" target="_blank" className="bg-primary text-center rounded-xl">เล่น POP CAT</Link>
            </div>
            <div className="flex flex-row justify-between h-fit m-10">
              <button
                type="button"
                className="bg-accent hover:bg-[#590B8E] text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  handleSmoothScroll({ id: "form4" });
                }}
              >
                <GrLinkPrevious /> กลับ
              </button>
              <button
                type="submit"
                className="bg-success/80 hover:bg-[#008C4A] text-white py-2 rounded-xl flex flex-row justify-center items-center gap-2 w-[40%]"
                onClick={() => {
                  
                }}
              >
                เสร็จสิ้น <FaCheck />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
