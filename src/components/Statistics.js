import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import ReactApexChart from "react-apexcharts";

const Statistics = () => {
  const [documentCounts, setDocumentCounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = dbService.Timestamp.now(); // 현재 날짜
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // 7일 전 날짜

      const querySnapshot = await dbService.getDocs(
        dbService.query(
          dbService.collection(dbService.firestore, "tweets"),
          dbService.where("createdAt", ">=", sevenDaysAgo),
          dbService.where("createdAt", "<=", currentDate)
        )
      );

      const counts = {};
      let startDate = new Date(sevenDaysAgo);

      for (let i = 0; i < 7; i++) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        const count = querySnapshot.docs.filter(
          (doc) =>
            doc.data().createdAt.toDate() >= startDate &&
            doc.data().createdAt.toDate() < endDate
        ).length;

        counts[`val${i + 1}`] = count;
        startDate.setDate(startDate.getDate() + 1);
      }

      setDocumentCounts(counts);
    };

    fetchData();
  }, []);

  console.log(documentCounts);

  return (
    <div>
      {documentCounts && (
        <ReactApexChart
          options={{
            chart: {
              id: "line-chart",
            },
            xaxis: {
              categories: Object.keys(documentCounts),
            },
          }}
          series={[
            {
              name: "Document Count",
              data: Object.values(documentCounts),
            },
          ]}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default Statistics;
