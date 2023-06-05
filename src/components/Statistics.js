import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import ReactApexChart from "react-apexcharts";

const Statistics = () => {
  const [documentCounts, setDocumentCounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = dbService.Timestamp.now(); // 현재 날짜
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // 14일 전 날짜

      const querySnapshot = await dbService.getDocs(
        dbService.query(
          dbService.collection(dbService.firestore, "tweets"),
          dbService.where("createdAt", ">=", twoWeeksAgo),
          dbService.where("createdAt", "<=", currentDate)
        )
      );

      const counts = {};
      let startDate = new Date(twoWeeksAgo);

      for (let i = 0; i < 14; i++) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        const count = querySnapshot.docs.filter(
          (doc) =>
            doc.data().createdAt.toDate() >= startDate &&
            doc.data().createdAt.toDate() < endDate
        ).length;

        const month = String(startDate.getMonth() + 1).padStart(2, "0");
        const day = String(startDate.getDate()).padStart(2, "0");
        const dateKey = `${month}.${day}`;

        counts[dateKey] = count;
        startDate.setDate(startDate.getDate() + 1);
      }

      setDocumentCounts(counts);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "40vw" }}>
      {documentCounts && (
        <ReactApexChart
          options={{
            chart: {
              id: "line-chart",
              toolbar: {
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: false,
                  zoomout: false,
                  pan: false,
                  reset:
                    true | '<img src="/static/icons/reset.png" width="20">',
                },
                menu: {
                  itemColors: "#F44336", // 원하는 색상으로 변경
                },
              },
              background: "#1C1C1C",
            },
            title: {
              text: "일일 게시물 수",
              align: "left",
              style: {
                fontSize: "20px",
                color: "#ffffff",
              },
            },
            xaxis: {
              categories: Object.keys(documentCounts),
              labels: {
                style: {
                  colors: "#ffffff",
                },
              },
              title: {
                text: "날짜",
                style: {
                  fontSize: "15px",
                  color: "#ffffff",
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: "#ffffff",
                },
              },
              title: {
                text: "게시물 수",
                style: {
                  fontSize: "15px",
                  color: "#ffffff",
                },
              },
            },
            grid: {
              row: {
                opacity: 0.5,
              },
            },
          }}
          series={[
            {
              name: "게시물 수",
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
