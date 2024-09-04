import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Easy Calc</h1>
      <div className="sm:text-base text-sm mb-10">
        모든 계산기를 한번에 모아서 사용해보세요
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/bmi">
          <div className="p-6 bg-white rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-2xl font-semibold">BMI 계산기</h2>
            <p className="mt-2 text-gray-600">신장과 몸무게로 BMI 계산하기</p>
          </div>
        </Link>
        <Link href="/salary">
          <div className="p-6 bg-white rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-2xl font-semibold">연봉 실수령 계산기</h2>
            <p className="mt-2 text-gray-600">나의 실수령 월급 계산하기</p>
          </div>
        </Link>
        <Link href="/parental">
          <div className="p-6 bg-white rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-2xl font-semibold">육아 휴직 급여 계산기</h2>
            <p className="mt-2 text-gray-600">나의 육아 휴직 급여 계산하기</p>
          </div>
        </Link>
        <Link href="/unemployment">
          <div className="p-6 bg-white rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-2xl font-semibold">실업 급여 계산기</h2>
            <p className="mt-2 text-gray-600">나의 실업 급여 계산하기</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
