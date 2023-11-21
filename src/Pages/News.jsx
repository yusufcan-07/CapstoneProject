import React, { useEffect, useState } from "react";
import KAPContainer from "../Components/KAPContainer";

export default function News() {
  const [disclosures, setDisclosures] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.allorigins.win/get?url=https://www.kap.org.tr/tr/api/disclosures"
    )
      .then((response) => response.json())
      .then((result) => {
        const responseData = JSON.parse(result.contents);
        if (Array.isArray(responseData) && responseData.length > 0) {
          // Extracting required data from the array of responses
          const extractedDisclosures = responseData.map((item) => {
            const stockCodes = item?.basic?.stockCodes || "N/A";
            const relatedStocks = item?.basic?.relatedStocks || "N/A";
            
            let combinedStocks = "N/A";
            if (stockCodes !== "N/A" && relatedStocks !== "N/A") {
              combinedStocks = stockCodes.concat(", ", relatedStocks);
            } else if (stockCodes !== "N/A") {
              combinedStocks = stockCodes;
            } else if (relatedStocks !== "N/A") {
              combinedStocks = relatedStocks;
            }

            return {
              title: item?.basic?.title || "",
              date: item?.basic?.publishDate || "N/A",
              companyName: item?.basic?.companyName || "Unknown",
              stockCodes: combinedStocks,
            };
          }).filter(disclosure => disclosure.combinedStocks !== "N/A");
          setDisclosures(extractedDisclosures);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
              >
                {/* Additional content here */}
                <p>Stock Codes: {disclosure.stockCodes}</p>
                {/* Other child components or content */}
              </KAPContainer>
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
}
