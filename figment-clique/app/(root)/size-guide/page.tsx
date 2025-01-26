import { Metadata } from "next";
import sizeChart from '../../../assets/size-chart.webp'
import Image from "next/image";

export const metadata: Metadata = {
  title: "Figment Clique | Size Chart",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Size Chart',
  },
};

const sizeData = [
  { size: "Small", width: '20"', length: '26.5”' },
  { size: "Medium", width: '21"', length: '27.5”' },
  { size: "Large", width: '22"', length: '28.5”' },
  { size: "X-Large", width: '23"', length: '29.5”' },
  { size: "2X-Large", width: '24"', length: '30.5”' }
];

export default function SizeChart() {
  return (
    <div className="flex flex-col min-h-[90dvh] container mx-auto lg:pt-14 lg:max-w-[1070px] px-5 py-10 gap-14 text-white">
      <h1 className="text-5xl font-bold text-center lg:text-start">Size Guide</h1>
      <div className="w-full flex flex-col justify-center items-center gap-7">
        <h3 className="font-bold uppercase text-lg">FIGMENT CLIQUE TEES (in inches)</h3>
        <table className="border-collapse w-[80%] md:w-[50%] text-start border border-white">
          <thead>
            <tr>
              <th className="text-start p-4 border border-white">SIZES</th>
              <th className="text-start p-4 border border-white">WIDTH</th>
              <th className="text-start p-4 border border-white">LENGTH</th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((item, index) => (
              <tr key={index}>
                <td className="p-4 border border-white">{item.size}</td>
                <td className="p-4 border border-white">{item.width}</td>
                <td className="p-4 border border-white">{item.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
