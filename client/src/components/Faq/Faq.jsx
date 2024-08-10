/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./Faq.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import FaqLoad from "../FaqLoad/FaqLoad.jsx";

export default function Faq() {
    const [faqPage, setFaqPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [faqs, setFaqs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { changeUserState, setChangeUserState } = useContext(globalContext);
    const [isFaqLoading, setFaqLoading] = useState(false);

    async function handlePostFaq(e) {
        setFaqLoading(true);
        try {
            let neighbour = e.target.parentNode.childNodes[0];
            if (!neighbour.value || neighbour.value.length === 0) return;
            const productID = searchParams.get("product");

            await axios.post(`https://cubiverse-bakend.vercel.app/api/v1/faqs?product=${productID}`, {
                question: neighbour.value
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            neighbour.value = "";
            setChangeUserState(prev => (prev + 1) % 2);
        } catch (error) {
            console.error(error);
        }
        setFaqLoading(false);
    }

    const handleFetchFaq = async () => {
        setFaqLoading(true);
        try {
            const productID = searchParams.get("product");

            const response = (await axios.get(`https://cubiverse-bakend.vercel.app/api/v1/faqs?product=${productID}&limit=3&page=${faqPage}`, { withCredentials: true })).data;

            setFaqs(response.faqs);
            setMaxPage(response.pages);
        } catch (error) {
            console.error(error);
        }
        setFaqLoading(false);
    };

    useEffect(() => {
        handleFetchFaq();
    }, [faqPage, changeUserState]);

    return (
        <>
            {isFaqLoading ? (
                <>
                    <FaqLoad />
                    <FaqLoad />
                    <FaqLoad />
                </>
            ) : (
                <>
                    {faqs.map((value, index) => (
                        <div className="faqRes" key={index}>
                            <div>
                                <p>Q :</p>
                                <p>{value.question}</p>
                            </div>
                            <div>
                                <p>A :</p>
                                {value.answer ? (
                                    <p>{value.answer}</p>
                                ) : (
                                    <p style={{ color: "gray" }}>Wait until admin replies...</p>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="pageBtns">
                        <button
                            className="prev enabled"
                            onClick={() => setFaqPage(Math.max(faqPage - 1, 1))}
                            style={{
                                backgroundColor: faqPage == 1 ? "#b1b1b1" : "orangered",
                                cursor: faqPage == 1 ? "not-allowed" : "pointer"
                            }}
                        >
                            <img src="/images/icons8-next-48.png" alt="" />
                        </button>
                        <button
                            className="next enabled"
                            onClick={() => setFaqPage(Math.min(faqPage + 1, maxPage))}
                            style={{
                                backgroundColor: faqPage == maxPage || maxPage == 0 ? "#b1b1b1" : "orangered",
                                cursor: faqPage == maxPage || maxPage == 0 ? "not-allowed" : "pointer"
                            }}
                        >
                            <img src="/images/icons8-next-48.png" alt="" />
                        </button>
                    </div>
                    <div className="postFaq">
                        <input type="text" name="question" id="question" placeholder="Ask a question.." />
                        <button onClick={handlePostFaq}>
                            <img src="/images/icons8-ask-question-48.png" alt="" />
                            <span>
                                Ask a question
                            </span>
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
