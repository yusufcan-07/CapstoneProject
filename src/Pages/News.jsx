import React, { useEffect, useState } from "react";
import KAPContainer from "../Components/KAPContainer";
import { query } from "../Config/api";

export default function News() {
  const [disclosures, setDisclosures] = useState([]);

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/get?url=https://www.kap.org.tr/tr/api/disclosures"
        );
        const result = await response.json();
        const responseData = JSON.parse(result.contents);

        if (Array.isArray(responseData) && responseData.length > 0) {
          const extractedDisclosures = await Promise.all(
            responseData.map(async (item) => {
              const title = item?.basic?.title || "";
              const stockCodes = item?.basic?.stockCodes || "N/A";
              const relatedStocks = item?.basic?.relatedStocks || "N/A";

              let combinedStocks = stockCodes !== "N/A" ? stockCodes : "";
              if (relatedStocks !== "N/A") {
                combinedStocks += combinedStocks
                  ? `, ${relatedStocks}`
                  : relatedStocks;
              }

              
              let sentimentAnalysis = [];
              if (title) {
                sentimentAnalysis = await query({ inputs: title });
              }

              // Assuming the response is an array with one object
              const sentiment = sentimentAnalysis.length > 0 ? sentimentAnalysis[0] : null;


              return {
                title,
                date: item?.basic?.publishDate || "N/A",
                companyName: item?.basic?.companyName || "Unknown",
                stockCodes: combinedStocks,
                sentiment, // Include sentiment in the state
              };
            })
          );

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
                sentiment={disclosure.sentiment?.label}
              >
                {/* Additional content here */}
                <p>Stock Codes: {disclosure.stockCodes}</p>
                <p>Sentiment: {disclosure.sentiment?.label || 'N/A'}</p> {/* Display sentiment label */}
                {/* Other child components or content */}
              </KAPContainer>
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
}
