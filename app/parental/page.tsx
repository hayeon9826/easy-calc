"use client";

import { useState } from "react";
import { calculateParentalLeavePay } from "calculify";

export default function ParentalLeaveCalculator() {
  const [leaveMonths, setLeaveMonths] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [spouseLeaveMonths, setSpouseLeaveMonths] = useState("");
  const [spouseLeaveDays, setSpouseLeaveDays] = useState("");
  const [averageMonthlyWage, setAverageMonthlyWage] = useState("");
  const [result, setResult] = useState<{
    payments: {
      month: number;
      generalLeavePayment: number;
      bonusLeavePayment?: number;
      extendedLeavePayment: number;
      retentionPayment?: number;
    }[];
    totalGeneralLeavePayment: number;
    totalBonusLeavePayment: number;
    totalExtendedLeavePayment: number;
  } | null>(null);

  const handleCalculate = () => {
    if (leaveMonths && leaveDays && averageMonthlyWage) {
      const parentalLeavePay = calculateParentalLeavePay({
        leavePeriod: {
          months: parseInt(leaveMonths),
          days: parseInt(leaveDays),
        },
        spouseLeavePeriod:
          spouseLeaveMonths && spouseLeaveDays
            ? {
                months: parseInt(spouseLeaveMonths),
                days: parseInt(spouseLeaveDays),
              }
            : undefined,
        averageMonthlyWage: parseFloat(averageMonthlyWage),
      });
      setResult(parentalLeavePay);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 py-10 sm:py-20">
      <h1 className="text-3xl font-bold mb-6">육아휴직 급여 계산기</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">휴직 개월 수</label>
            <input
              type="number"
              value={leaveMonths}
              onChange={(e) => setLeaveMonths(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="휴직 개월 수"
            />
          </div>
          <div>
            <label className="block text-gray-700">휴직 추가 일 수</label>
            <input
              type="number"
              value={leaveDays}
              onChange={(e) => setLeaveDays(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="휴직 일 수"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">배우자 휴직 개월 수</label>
            <input
              type="number"
              value={spouseLeaveMonths}
              onChange={(e) => setSpouseLeaveMonths(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="배우자 휴직 개월 수 (선택)"
            />
          </div>
          <div>
            <label className="block text-gray-700">배우자 휴직 일 수</label>
            <input
              type="number"
              value={spouseLeaveDays}
              onChange={(e) => setSpouseLeaveDays(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="배우자 휴직 일 수 (선택)"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700">평균 월급 (원)</label>
          <input
            type="number"
            value={averageMonthlyWage}
            onChange={(e) => setAverageMonthlyWage(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="평균 월급을 입력해주세요"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          육아휴직 급여 계산하기
        </button>
        {result && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p className="text-gray-700">
              총 일반 육아휴직 급여:{" "}
              <span className="font-bold">
                {result.totalGeneralLeavePayment.toLocaleString()}
              </span>{" "}
              원
            </p>
            <p className="text-gray-700">
              총 보너스 육아휴직 급여:{" "}
              <span className="font-bold">
                {result.totalBonusLeavePayment.toLocaleString()}
              </span>{" "}
              원
            </p>
            <p className="text-gray-700">
              총 6+6 부모 육아휴직 급여:{" "}
              <span className="font-bold">
                {result.totalExtendedLeavePayment.toLocaleString()}
              </span>{" "}
              원
            </p>
            <div className="mt-2 space-y-2">
              {result.payments.map((payment) => (
                <div
                  key={payment.month}
                  className="bg-white p-3 rounded shadow-sm"
                >
                  <p className="text-gray-700">
                    <span className="font-bold">{payment.month}월차</span>
                  </p>
                  <p className="text-gray-700">
                    일반 급여: {payment.generalLeavePayment.toLocaleString()} 원
                  </p>
                  {payment.bonusLeavePayment && (
                    <p className="text-gray-700">
                      보너스 급여: {payment.bonusLeavePayment.toLocaleString()}{" "}
                      원
                    </p>
                  )}
                  <p className="text-gray-700">
                    6+6 부모 급여:{" "}
                    {payment.extendedLeavePayment.toLocaleString()} 원
                  </p>
                  {payment.retentionPayment && (
                    <p className="text-gray-700">
                      잔여 급여: {payment.retentionPayment.toLocaleString()} 원
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
