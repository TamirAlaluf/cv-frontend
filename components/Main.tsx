import Optimizer from "./Optimizer";
export default function Main({ LAMBDA_URL }: { LAMBDA_URL: string }) {
  return (
    <>
      <main className="pt-20 pb-40" id="main">
        <div className="max-w-6xl mx-auto p-8 space-y-8">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl 
             "
            >
              The{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-200 dark:from-blue-900 dark:to-cyan-900 transform rotate-3 z-[-1]"></span>
                <span className="relative text-[#3E2C1C] px-2 py-1 font-bold">
                  Easiest
                </span>
              </span>{" "}
              Way to Reach Recruiters
            </h1>
          </div>

          <Optimizer LAMBDA_URL={LAMBDA_URL} />
        </div>
      </main>
    </>
  );
}
