import React, { useEffect, useState } from "react";
import KAPContainer from "../Components/KAPContainer";
import { query } from "../Config/api";

export default function News() {
  const [disclosures, setDisclosures] = useState([]);

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        const response = await fetch("/api/disclosures", {
          method: "GET",
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //console.log(response);
        const responseData = await response.json(); // This already returns a parsed JSON object/array

        if (Array.isArray(responseData) && responseData.length > 0) {
          const extractedDisclosures = responseData.map((item) => {
            const title = item?.basic?.title || "";
            const stockCodes = item?.basic?.stockCodes || "N/A";
            const relatedStocks = item?.basic?.relatedStocks || "N/A";

            let combinedStocks = stockCodes !== "N/A" ? stockCodes : "";
            if (relatedStocks !== "N/A") {
              combinedStocks += combinedStocks
                ? `, ${relatedStocks}`
                : relatedStocks;
            }

            return {
              title,
              date: item?.basic?.publishDate || "N/A",
              companyName: item?.basic?.companyName || "Unknown",
              stockCodes: combinedStocks,
            };
          });

          setDisclosures(
            extractedDisclosures.filter((disclosure) => disclosure.stockCodes)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDisclosures();
  }, []);

  return (
    <div className="content">
      <center>
        <ul>
          {disclosures.map((disclosure, index) => (
            <li key={index}>
              <KAPContainer
                title={disclosure.title}
                date={disclosure.date}
                name={disclosure.companyName}
                stockCodes={disclosure.stockCodes}
                // sentiment={disclosure.sentiment?.label}
              >
                {/* Additional content here */}
                <p>Stock Codes: {disclosure.stockCodes}</p>
                {/* <p>Sentiment: {disclosure.sentiment?.label || 'N/A'}</p> */}
                {/* Other child components or content */}
              </KAPContainer>
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
}
