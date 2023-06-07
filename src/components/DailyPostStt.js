import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import ReactApexChart from "react-apexcharts";

const DailyPostStt = () => {
  const [delNDocumentCounts, setDelNDocumentCounts] = useState(null);
  const [delYDocumentCounts, setDelYDocumentCounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = dbService.Timestamp.now().toDate(); // 현재 날짜
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 13); // 14일 전 날짜

      console.log(currentDate);
      console.log(twoWeeksAgo);

      const querySnapshotDelN = await dbService.getDocs(
        dbService.query(
          dbService.collection(dbService.firestore, "tweets"),
          dbService.where("createdAt", ">=", twoWeeksAgo),
          dbService.where("createdAt", "<=", currentDate),
          dbService.where("del", "==", "N"),
          dbService.orderBy("createdAt", "desc")
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
        const countDelN = querySnapshotDelN.docs.filter((doc) => {
          return (
            doc.data().createdAt.toDate() >= startDate &&
            doc.data().createdAt.toDate() < endDate
          );
        }).length;

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

        console.log(countDelN);
        console.log(countDelY);

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
        <div className="chart__containger">
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
                },
                style: {
                  border: "1px solid",
                },
              },
              title: {
                text: `일일 게시물 수 ${new Date().getFullYear()}년`,
                align: "left",
                style: {
                  fontSize: "20px",
                  color: "#666666",
                },
              },
              xaxis: {
                categories: Object.keys(delNDocumentCounts),
                labels: {
                  style: {
                    colors: "#666666",
                  },
                },
                title: {
                  text: "날짜",
                  style: {
                    fontSize: "15px",
                    color: "#666666",
                  },
                },
              },
              yaxis: [
                {
                  labels: {
                    style: {
                      colors: "#666666",
                    },
                  },
                  title: {
                    text: "게시물",
                    style: {
                      fontSize: "15px",
                      color: "#666666",
                    },
                  },
                },
                {
                  opposite: true,
                  labels: {
                    style: {
                      colors: "#666666",
                    },
                  },
                  title: {
                    text: "삭제된 게시물",
                    style: {
                      fontSize: "15px",
                      color: "#666666",
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
                  colors: "#666666", // 폰트 색상을 빨간색(#FF0000)으로 설정
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
        </div>
      )}
    </>
  );
};
export default DailyPostStt;
