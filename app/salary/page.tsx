"use client";

import { useState } from "react";
import { calculateNetSalary } from "calculify";

export default function NetSalaryCalculator() {
  const [salaryType, setSalaryType] = useState<"연봉" | "월급">("연봉");
  const [includeRetirement, setIncludeRetirement] = useState<"별도" | "포함">(
    "별도"
  );
  const [salary, setSalary] = useState(0);
  const [dependents, setDependents] = useState("");
  const [childrenUnder20, setChildrenUnder20] = useState("");
  const [nonTaxableAmount, setNonTaxableAmount] = useState("");
  const [result, setResult] = useState<{
    monthlyNetSalary: number;
    monthlyDeductions: {
      pension: number;
      healthInsurance: number;
      longTermCare: number;
      employmentInsurance: number;
      incomeTax: number;
      localIncomeTax: number;
      totalDeductions: number;
    };
  } | null>(null);

  const handleCalculate = () => {
    if (salary) {
      const netSalary = calculateNetSalary({
        salaryType,
        includeRetirement,
        salary: salary,
        dependents: dependents ? parseInt(dependents) : 0,
        childrenUnder20: childrenUnder20 ? parseInt(childrenUnder20) : 0,
        nonTaxableAmount: nonTaxableAmount ? parseFloat(nonTaxableAmount) : 0,
      });
      setResult(netSalary);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 py-10 sm:py-20">
      <h1 className="text-3xl font-bold mb-6">연봉 실수령 계산기</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block text-gray-700">급여 유형</label>
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value as "연봉" | "월급")}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="연봉">연봉</option>
            <option value="월급">월급</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">퇴직금 포함 여부</label>
          <select
            value={includeRetirement}
            onChange={(e) =>
              setIncludeRetirement(e.target.value as "별도" | "포함")
            }
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="별도">별도</option>
            <option value="포함">포함</option>
          </select>
        </div>
        <div>
          <div className="flex justify-between">
            <label className="block text-gray-700">{salaryType} (원)</label>
            <span className="text-right text-xs text-gray-500">
              {salary.toLocaleString() || 0}원
            </span>
          </div>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(parseInt(e.target.value))}
            className="mt-1 p-2 border rounded w-full"
            placeholder={`${salaryType}을 원 단위로 입력해주세요`}
          />
        </div>
        <div>
          <label className="block text-gray-700">부양 가족 수</label>
          <input
            type="number"
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="부양 가족 수를 입력해주세요 (본인 포함)"
          />
        </div>
        <div>
          <label className="block text-gray-700">20세 이하 자녀 수</label>
          <input
            type="number"
            value={childrenUnder20}
            onChange={(e) => setChildrenUnder20(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="20세 이하 자녀 수를 입력해주세요 (선택)"
          />
        </div>
        <div>
          <label className="block text-gray-700">비과세액 (원)</label>
          <input
            type="number"
            value={nonTaxableAmount}
            onChange={(e) => setNonTaxableAmount(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="비과세액을 입력해주세요 (선택)"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          실수령액 계산하기
        </button>
        {result && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p className="text-gray-700">
              예상 월 실수령액은{" "}
              <span className="font-bold">
                {result.monthlyNetSalary.toLocaleString()}
              </span>{" "}
              원 입니다.
            </p>
            <p className="text-gray-700">
              총 공제액:{" "}
              <span className="font-bold">
                {result.monthlyDeductions.totalDeductions.toLocaleString()}
              </span>{" "}
              원
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-gray-700">
                국민연금: {result.monthlyDeductions.pension.toLocaleString()} 원
              </p>
              <p className="text-gray-700">
                건강보험:{" "}
                {result.monthlyDeductions.healthInsurance.toLocaleString()} 원
              </p>
              <p className="text-gray-700">
                장기요양보험:{" "}
                {result.monthlyDeductions.longTermCare.toLocaleString()} 원
              </p>
              <p className="text-gray-700">
                고용보험:{" "}
                {result.monthlyDeductions.employmentInsurance.toLocaleString()}{" "}
                원
              </p>
              <p className="text-gray-700">
                소득세: {result.monthlyDeductions.incomeTax.toLocaleString()} 원
              </p>
              <p className="text-gray-700">
                지방소득세:{" "}
                {result.monthlyDeductions.localIncomeTax.toLocaleString()} 원
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
