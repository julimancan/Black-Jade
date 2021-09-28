import styled from "@emotion/styled";
import Link from "next/link"

const ContactWrapper = styled.main`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 3rem;
  }
`;

const contact = () => {
  return (
    <ContactWrapper>
      <h1>Contact Us</h1>
      <p>
        We would love to discuss your projects and how we can help you make it better.
      </p>
      <br/>
      <p>
        email us at <Link href="mailto:blackjadecollective@gmail.com">blackjadecollective@gmail.com</Link>
      </p>
    </ContactWrapper>
  )
}

export default contact
