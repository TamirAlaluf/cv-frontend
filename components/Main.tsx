import Optimizer from "./Optimizer";
export default function Main({ LAMBDA_URL }: { LAMBDA_URL: string }) {
  return (
    <>
      <main className="pt-20 pb-40" id="main">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-2 font-thin">
              The <span className="text-[#1468EF]">simplest</span> way to
              optimize resume and pass ATS
            </h1>
          </div>

          <Optimizer LAMBDA_URL={LAMBDA_URL} />
        </div>
      </main>
    </>
  );
}
