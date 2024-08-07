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

            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            await axios.post(`${base}/api/v1/faqs?product=${productID}`, {
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
            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            const response = (await axios.get(`${base}/api/v1/faqs?product=${productID}&limit=3&page=${faqPage}`, { withCredentials: true })).data;

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

    useEffect(() => {
        const updateButtonState = () => {
            const prev = document.querySelector('.prev');
            const next = document.querySelector('.next');

            if (faqPage === 1) {
                prev.setAttribute('disabled', true);
                prev.classList.add('disabled');
                prev.classList.remove('enabled');
            } else {
                prev.removeAttribute('disabled');
                prev.classList.add('enabled');
                prev.classList.remove('disabled');
            }

            if (faqPage === maxPage || maxPage === 0) {
                next.setAttribute('disabled', true);
                next.classList.add('disabled');
                next.classList.remove('enabled');
            } else {
                next.removeAttribute('disabled');
                next.classList.add('enabled');
                next.classList.remove('disabled');
            }
        };

        updateButtonState();
    }, [faqPage, maxPage]);

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
                        >
                            Prev
                        </button>
                        <button
                            className="next enabled"
                            onClick={() => setFaqPage(Math.min(faqPage + 1, maxPage))}
                        >
                            Next
                        </button>
                    </div>
                    <div className="postFaq">
                        <input type="text" name="question" id="question" placeholder="Ask a question.." />
                        <button onClick={handlePostFaq}>Ask a question</button>
                    </div>
                </>
            )}
        </>
    );
}
