"use client";

import { useState } from "react";
import { calculateBmi } from "calculify";

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
  } | null>(null);

  const handleCalculate = () => {
    if (height && weight) {
      const bmi = calculateBmi(parseFloat(height), parseFloat(weight));
      setResult(bmi);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 py-10 sm:py-20">
      <h1 className="text-3xl font-bold mb-6">체질량지수(BMI) 계산기</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">키 (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="신장(키)를 cm 단위로 입력해주세요"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">몸무게 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="몸무게를 kg 단위로 입력해주세요"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          BMI 계산하기
        </button>
        {result && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p className="text-gray-700">
              당신의 체질량지수는{" "}
              <span className="font-bold">{result.bmi.toFixed(2)}</span> 입니다.
            </p>
            <p className="text-gray-700">
              당신의 현재상태는{" "}
              <span className="font-bold">{result.category}</span> 입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
