"use client";

import { useState } from "react";
import { calculateUnemploymentBenefit } from "calculify";

export default function UnemploymentCalculator() {
  const [age, setAge] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [employmentInsurancePeriod, setEmploymentInsurancePeriod] =
    useState("");
  const [recentThreeMonthsSalaries, setRecentThreeMonthsSalaries] = useState([
    "",
    "",
    "",
  ]);
  const [averageWorkDays, setAverageWorkDays] = useState("");
  const [dailyWorkHours, setDailyWorkHours] = useState("");
  const [result, setResult] = useState<{
    dailyBenefitAmount: number;
    expectedPaymentDays: number;
    totalExpectedAmount: number;
  } | null>(null);

  const handleCalculate = () => {
    if (
      age &&
      employmentInsurancePeriod &&
      recentThreeMonthsSalaries.every((salary) => salary) &&
      averageWorkDays &&
      dailyWorkHours
    ) {
      const unemploymentBenefit = calculateUnemploymentBenefit({
        age: parseInt(age),
        isDisabled,
        employmentInsurancePeriod: parseInt(employmentInsurancePeriod),
        recentThreeMonthsSalaries: recentThreeMonthsSalaries.map(Number),
        averageWorkDays: parseInt(averageWorkDays),
        dailyWorkHours: parseFloat(dailyWorkHours),
      });
      setResult(unemploymentBenefit);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 py-10 sm:py-20">
      <h1 className="text-3xl font-bold mb-6">실업급여 계산기</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block text-gray-700">나이</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="나이를 입력하세요"
          />
        </div>
        <div>
          <label className="block text-gray-700">장애 여부</label>
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            고용보험 총 가입기간 (개월)
          </label>
          <input
            type="number"
            value={employmentInsurancePeriod}
            onChange={(e) => setEmploymentInsurancePeriod(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="가입 기간 (개월)"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">
            최근 3개월간 월급 (세전)
          </label>
          {recentThreeMonthsSalaries.map((salary, index) => (
            <input
              key={index}
              type="number"
              value={salary}
              onChange={(e) => {
                const updatedSalaries = [...recentThreeMonthsSalaries];
                updatedSalaries[index] = e.target.value;
                setRecentThreeMonthsSalaries(updatedSalaries);
              }}
              className="mt-1 p-2 border rounded w-full"
              placeholder={`월급 ${index + 1} (원)`}
            />
          ))}
        </div>
        <div>
          <label className="block text-gray-700">월평균 근무일수</label>
          <input
            type="number"
            value={averageWorkDays}
            onChange={(e) => setAverageWorkDays(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="평균 근무일수"
          />
        </div>
        <div>
          <label className="block text-gray-700">1일 근무시간</label>
          <input
            type="number"
            value={dailyWorkHours}
            onChange={(e) => setDailyWorkHours(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="1일 근무시간"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          실업급여 계산하기
        </button>
        {result && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p className="text-gray-700">
              1일 구직 급여일액:{" "}
              <span className="font-bold">
                {result.dailyBenefitAmount.toLocaleString()}
              </span>{" "}
              원
            </p>
            <p className="text-gray-700">
              예상 지급일수:{" "}
              <span className="font-bold">{result.expectedPaymentDays}</span> 일
            </p>
            <p className="text-gray-700">
              총 예상 지급액:{" "}
              <span className="font-bold">
                {result.totalExpectedAmount.toLocaleString()}
              </span>{" "}
              원
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
