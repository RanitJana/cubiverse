/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./Faq.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Faq() {


    const [faqPage, setFaqPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [faqs, setFaqs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();


    async function handlePostFaq(e) {
        try {
            let neighbour = e.target.parentNode.childNodes[0];
            console.log(neighbour);
            if (!neighbour.value || neighbour.value.length == 0) return;
            const productID = searchParams.get("product");
            let response = await axios.post(`http://localhost:5000/api/v1/faqs?product=${productID}`, {
                question: neighbour.value
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

        } catch (error) {
            console.log(error);
        }
    }

    const handleFetchFaq = async () => {
        try {
            const productID = new URLSearchParams(window.location.search).get("product");
            const response = (await axios.get(`http://localhost:5000/api/v1/faqs?product=${productID}&limit=3&page=${faqPage}`, { withCredentials: true })).data;

            setFaqs(response.faqs);
            setMaxPage(response.pages);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchFaq();
    }, [faqPage]);

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

            if (faqPage === maxPage) {
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


    useEffect(() => {
        handleFetchFaq();
    }, [faqPage])

    return (
        <>
            {
                faqs.map((value, index) => {
                    return (
                        <div className="faqRes" key={index}>
                            <div>
                                <p>Q :</p>
                                <p>{value.question}</p>
                            </div>
                            <div>
                                <p>A :</p>
                                {
                                    value.answer ?
                                        <p>
                                            {value.answer}
                                        </p>
                                        :
                                        <p style={{ color: "gray" }}>Wait until admin replys...</p>
                                }
                            </div>
                        </div>
                    )
                })

            }
            <div className="pageBtns">
                <button
                    className="prev enabled"
                    onClick={e => {
                        setFaqPage(Math.max(faqPage - 1, 1));
                    }}
                >Prev</button>
                <button className="next enabled"
                    onClick={e => {
                        setFaqPage(Math.min(faqPage + 1, maxPage));
                    }}
                >Next</button>
            </div>
            <div className="postFaq">
                <input type="text" name="question" id="question" placeholder="Ask a question.." />
                <button onClick={handlePostFaq}>Ask a question</button>
            </div>
        </>
    )
}