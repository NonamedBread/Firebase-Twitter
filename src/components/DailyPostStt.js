import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import ReactApexChart from "react-apexcharts";

const DailyPostStt = () => {
  const [delNDocumentCounts, setDelNDocumentCounts] = useState(null);
  const [delYDocumentCounts, setDelYDocumentCounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = dbService.Timestamp.now(); // 현재 날짜
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // 14일 전 날짜

      const querySnapshotDelN = await dbService.getDocs(
        dbService.query(
          dbService.collection(dbService.firestore, "tweets"),
          dbService.where("createdAt", ">=", twoWeeksAgo),
          dbService.where("createdAt", "<=", currentDate),
          dbService.where("del", "==", "N")
        )
      );

      const querySnapshotDelY = await dbService.getDocs(
        dbService.query(
          dbService.collection(dbService.firestore, "tweets"),
          dbService.where("createdAt", ">=", twoWeeksAgo),
          dbService.where("createdAt", "<=", currentDate),
          dbService.where("del", "==", "Y")
        )
      );

      const countsDelN = {};
      const countsDelY = {};
      let startDate = new Date(twoWeeksAgo);

      for (let i = 0; i < 14; i++) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        const countDelN = querySnapshotDelN.docs.filter(
          (doc) =>
            doc.data().createdAt.toDate() >= startDate &&
            doc.data().createdAt.toDate() < endDate
        ).length;

        const countDelY = querySnapshotDelY.docs.filter(
          (doc) =>
            doc.data().createdAt.toDate() >= startDate &&
            doc.data().createdAt.toDate() < endDate
        ).length;

        const month = String(startDate.getMonth() + 1).padStart(2, "0");
        const day = String(startDate.getDate()).padStart(2, "0");
        const dateKey = `${month}.${day}`;

        countsDelN[dateKey] = countDelN;
        countsDelY[dateKey] = countDelY;

        startDate.setDate(startDate.getDate() + 1);
      }

      setDelNDocumentCounts(countsDelN);
      setDelYDocumentCounts(countsDelY);
    };

    fetchData();
  }, []);

  return (
    <>
      {delNDocumentCounts && delYDocumentCounts && (
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
              text: `일일 게시물 수 ${new Date().getFullYear()}년`,
              align: "left",
              style: {
                fontSize: "20px",
                color: "#ffffff",
              },
            },
            xaxis: {
              categories: Object.keys(delNDocumentCounts),
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
            yaxis: [
              {
                labels: {
                  style: {
                    colors: "#ffffff",
                  },
                },
                title: {
                  text: "게시물",
                  style: {
                    fontSize: "15px",
                    color: "#ffffff",
                  },
                },
              },
              {
                opposite: true,
                labels: {
                  style: {
                    colors: "#ffffff",
                  },
                },
                title: {
                  text: "삭제된 게시물",
                  style: {
                    fontSize: "15px",
                    color: "#ffffff",
                  },
                },
              },
            ],
            grid: {
              row: {
                opacity: 0.5,
              },
            },
            legend: {
              position: "top",
              labels: {
                colors: "#ffffff", // 폰트 색상을 빨간색(#FF0000)으로 설정
              },
            },
          }}
          series={[
            {
              name: "게시물",
              data: Object.values(delNDocumentCounts),
              color: "#04AAFF",
            },
            {
              name: "삭제된 게시물",
              data: Object.values(delYDocumentCounts),
              color: "#FB5500",
              yAxisIndex: 1,
            },
          ]}
          type="line"
          height={350}
        />
      )}
    </>
  );
};
export default DailyPostStt;
