import { Breadcrumbs } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

import { BreadcrumbArrowRightIcon } from "@/components";

const TermsCondition = () => {
  return (
    <>
      <div className="relative bg-no-repeat bg-center bg-contain md:h-[240px] overflow-hidden bg-product-empty bg-[#f9f7f8]">
        <Image
          src="/termscondition.jpg"
          title="Terms and Condition"
          alt="Terms and Condition"
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-auto min-h-[100px]"
        />
        <div className="container container-content md:p-4">
          <div className="absolute top-1/2 transform -translate-y-1/2 text-center">
            <h1 className="font-serif font-normal text-white text-xl sm:text-2xl md:text-4xl mb-3">
              Terms & Conditions
            </h1>
            <Breadcrumbs
              separator={
                <BreadcrumbArrowRightIcon className="h-3 w-3  md:h-5 md:w-5 text-gray-500" />
              }
              className="bg-transparent p-1 text-white pt-2"
            >
              <Link href="/" className="flex opacity-60 space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 md:h-5 md:w-5"
                  viewBox="0 0 20 20"
                  fill="#94a3b8"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-gray-400 text-xs text-sm">Home</span>
              </Link>
              <a href="#" className="text-[#ffffff] text-xs text-sm">
                Terms & Conditions
              </a>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto pt-[45px] pb-[70px] px-4">
        <div className="prose max-w-none text-gray-800">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
            {/* DIVINE SOLITAIRES
            <br />
            DIAMOND & JEWELLERY
            <br />
            CUSTOMER POLICY
            <br /> */}
            POLICY DATED 01ST APRIL 2025 VERSION 4.0
          </h2>

          <h3 className="text-lg font-semibold mt-8 mb-2 underline">
            General T & C
          </h3>
          <ol className="list-[lower-roman] space-y-3 pl-5 text-justify text-gray-800 text-base leading-6 [&>li::marker]:font-bold">
            <li>
              Divine Solitaires (DS) (the brand of R S Diamonds Private Limited)
              with its unique features offers various facilities to its
              Customers, as a brand offering which includes but not limited to
              Upgrade, Exchange, Buyback, Insurance or Loan against Diamonds
              based on its transparent and standard pricing system across India
              and the said features can only be availed by the Customers who are
              registered with DS and have accepted the terms and conditions
              incorporated by the DS.
            </li>
            <li>
              Various features offered by DS is backed by with respective
              policies which are uniform across India as evident from DS Verify
              & Track feature which anyone can access anytime through various
              online mode.
            </li>
            <li>
              The terms and conditions displayed on the website/mobile app of DS
              acts as an agreement between the Customer and Divine Solitaires
              (DS).
            </li>
            <li>
              Divine Solitaires logo, trademarks, service marks, trade names,
              copyrights, and all designs, text, graphics, images, pictures,
              selection, promotional material coordinate, information, data,
              software or any other intellectual property rights in any
              promotion, publication or press release or in any manner
              whatsoever (“Intellectual Property”) are the proprietary property
              of R S Diamonds Private Limited or its licensors and are protected
              by Trademark, Copyright laws and unfair competition laws and none
              of them can be copied, imitated or used or register any work or
              symbol from combination thereof or any kind of Intellectual
              Property in whole or part without the prior written permission of
              R.S. Diamonds Pvt Ltd.
            </li>
            <li>
              On scrutiny, if DS found or is of the opinion that any user/
              customer is misusing the website or infringing our trademarks or
              involved in any violation of DS policies, the DS reserves all
              rights to suspend the access to the user or terminate the services
              of the customer, as the case may be and take appropriate legal
              action against such person.
            </li>
            <li>
              The users/customers agree to defend, indemnify and hold harmless R
              S Diamonds Private Limited, its independent contractors, service
              providers, consultants, respective directors, employees, agents
              etc, directly and indirectly from and against all claims, damages,
              obligations, losses, liabilities, cost or debt and expenses
              incurred due to the fault of customer or any breach of the
              applicable law or infringement of the Intellectual Property.
            </li>
            <li>
              If any of these terms and conditions is subsequently deemed
              unlawful or void for any reason, then such provisions shall be
              enforced to the maximum extent permissible so as to achieve the
              intent of this customer policy insofar as possible, and shall not
              affect the validity and enforceability of any remaining
              provisions.
            </li>
            <li>
              All the communication from DS will be done only through Email ID:{" "}
              <a
                href="mailto:customerservice@divinesolitaires.com"
                className="underline text-blue-600"
              >
                customerservice@divinesolitaires.com
              </a>{" "}
              and will be considered as valid communication.
            </li>
            <li>
              DS reserves the right, at any time without prior notice and
              without assigning any reason whatsoever, to
              add/alter/modify/change or vary all of these terms and conditions
              or replace, wholly or in part, all or any of the features or
              facilities or offers provided by DS. It shall be the
              responsibility of the user/customer to pursue the updated
              information from the website/ mobile application of DS.
            </li>
            <li>
              The DS would make best endeavours to amicably resolve the disputes
              of the user/customers or any third party. If the dispute remains
              unresolved for more than six (6) months, then all disputes shall
              be subject to the exclusive jurisdiction of the courts in Mumbai.
            </li>
            <li>
              The liability of DS arising from or in connection with any claim,
              including but not limited to litigation, shall in no event exceed
              the value of the DS products involved in the transaction between
              the parties.
            </li>
            <li>
              All policies related to features and facility offered by DS, at
              the discretion of DS, will stand suspended during the time of
              force majeure events such as natural calamity, act of god,
              economic or industry level crises and/or political crises, acts of
              war or any other cause not enumerated herein but which is beyond
              the reasonable control of DS. This will be communicated from time
              to time.
            </li>
            <li>
              At Divine Solitaires, every attempt is made to ensure that online
              catalogue is accurate and complete as much as possible, to enable
              the Customer to view the beauty and shapes of a particular
              product. Nevertheless, inadvertent errors may occur, the Divine
              Solitaire declaims any responsibility for any errors and accuracy
              of the information. Any feedback from user is most welcome to
              improve the quality of the content.
            </li>
            <li>
              DS and its channels partners accept no responsibility for the
              failure of any third party to fulfil their contractual obligations
              in relation to their services or offers.
            </li>
            <li>
              If DS has waived or modified any condition for a particular
              instance, such waiver or modification shall not be deemed as
              precedence and shall not be applicable for a subsequent
              transaction. The waiver of any condition for one customer does not
              oblige DS to extend the same benefit or concession to other
              customers. Each customer’s circumstances and agreements with DS
              are independent and distinct.
            </li>
          </ol>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-left">
                I. Cancellation, Return and Refund Policy
              </h2>

              <h3 className="text-lg font-semibold mt-8">For Ecommerce:</h3>
              <p className="font-semibold mt-4">Cancellation by Customer:</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  The customers can cancel the orders at any time before the DS
                  Product is shipped or dispatched to the customer.
                </li>
                <li>
                  The Order cannot be cancelled under any circumstances, once it
                  is shipped or dispatched by DS.
                </li>
                <li>
                  Incase of order of customised DS products total value of which
                  exceeds INR 10 lakhs, on cancellation of such product refund
                  shall be done as per Buyback policy and if value of such DS
                  product is below INR 10 Lakhs refund shall be done as per
                  exchange policy.
                </li>
                <li>
                  If the total order value exceeds INR 10 lakhs, refund shall be
                  done as per Buyback policy.
                </li>
                <li>
                  On cancellation, any benefits availed or obtained by the
                  Customers under any scheme or offers at the time of the
                  purchase, shall be reversed and/ or returned by the customer,
                  Premium if any paid will not be returned back to the customer.
                </li>
              </ol>

              <h4 className="font-semibold mt-6">Procedure for Cancellation</h4>
              <p className="font-semibold mt-2">Cancellation by Customer:</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Cancellation requests must be submitted by filling up the
                  Request Form available at the DS website and/or at mobile
                  application.
                </li>
                <li>
                  Customers must provide the following details in their
                  cancellation request:
                  <ul className="list-[lower-roman] pl-5 mt-2 space-y-1 [&>li::marker]:font-bold [&>li::marker]:text-base">
                    <li>UID Number</li>
                    <li>Customer Name</li>
                    <li>Reason for cancellation</li>
                  </ul>
                </li>
                <li>
                  The DS will review such request for cancellation and will
                  notify its decision on the cancellation request.
                </li>
                <li>
                  The DS will refund the amount to the customer within 14
                  (fourteen) business days from the date of confirmation of the
                  cancellation order.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-8">
                For Offline Purchase
              </h3>
              <p className="font-semibold mt-4">Cancellation by Customer:</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  The customers can cancel the orders at any time before the DS
                  Product is handed over to the customer.
                </li>
                <li>
                  Incase of order of customised DS products total value of which
                  exceeds INR 10 lakhs, on cancellation of such product refund
                  shall be done as per Buyback policy and if value of such DS
                  product is below INR 10 Lakhs refund shall be done as per
                  exchange policy.
                </li>
                <li>
                  If the total order value exceeds INR 10 lakhs, refund shall be
                  done as per Buyback policy.
                </li>
                <li>
                  On cancellation, any benefits availed or obtained by the
                  Customers under any scheme or offers at the time of the
                  purchase, shall be reversed and/ or returned by the customer,
                  Premium if any paid will not be returned back to the customer.
                </li>
              </ol>

              <h4 className="font-semibold mt-6">Procedure for Cancellation</h4>
              <p className="font-semibold mt-2">Cancellation by Customer:</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Cancellation requests must be submitted by filling up the
                  Request Form available at the DS website and/or at mobile
                  application.
                </li>
                <li>
                  Customers must provide the following details in their
                  cancellation request:
                  <ul className="list-[lower-roman] pl-5 mt-2 space-y-1 [&>li::marker]:font-bold [&>li::marker]:text-base">
                    <li>UID Number</li>
                    <li>Customer Name</li>
                    <li>Reason for cancellation</li>
                  </ul>
                </li>
                <li>
                  The PJ/DS will review such request for cancellation and will
                  notify its decision on the cancellation request.
                </li>
                <li>
                  The DS will refund the amount to the customer within 14
                  (fourteen) business days from the date of confirmation of the
                  cancellation order, the amount mentioned in DS Verify and
                  Track shall be the final amount.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-8">
                A. Cancellation by Divine Solitaires:
              </h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  There may be certain orders that Divine Solitaires might not
                  accept & deliver, and therefore, DS reserves the right to
                  refuse or cancel any order at its sole discretion in lieu of
                  multiple reasons including any internal policy decision, force
                  majeure event, non-availability of any ordered product or part
                  thereof or limitation on available quantity requested, errors
                  in pricing or product information or certain issues identified
                  by our fraud avoidance department or any other issue which
                  Divine Solitaires identifies for the purpose of not accepting
                  the order. The Divine solitaire does not owe any
                  justification/ explanation to any customer for cancellation or
                  refusal to confirm the order and shall not be liable for such
                  cancellation.
                </li>
                <li>
                  On cancellation by DS, no processing fees shall be charged.
                  The Customer shall be intimated of the refund of entire amount
                  originally paid by the customer to the original payment source
                  on the registered email ID & mobile number.
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-left">
                II. Return and Refund Policy
              </h2>

              <h3 className="text-lg font-semibold mt-8">A. For Ecommerce</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Return Policy shall be applicable for the Customers who made
                  an online purchase for the DS products (except accessories)
                  through our official E-commerce platform namely
                  shop.divinesolitaires.com or through our mobile application.
                </li>
                <li>
                  Divine Solitaires offers 21 (Twenty One) days from receiving
                  the product, return policy to every Customer for its DS
                  product sold, through its Ecommerce platform if the returned
                  goods are in its original form and subject to QC check.
                </li>
                <li>
                  At the time of QC check If DS found that the returned DS
                  product is damaged or used refund of such DS Product will be
                  as per exchange policy.
                </li>
                <li>
                  The DS will confirm to the request of the Customer for Return
                  only after receipt of the DS product and its acceptance after
                  QC check of the product. The same shall be intimated by DS to
                  the Customer. The discretion of DS in this regard shall be
                  final and binding upon the Customer.
                </li>
                <li>
                  If the total value of DS product exceeds INR 10 lakhs, refund
                  shall be done as per Buyback policy.
                </li>
                <li>
                  DS and International Certificate is mandatorily required to be
                  submitted at the time of return of the product for its QC
                  check.
                </li>
                <li>
                  Upon availing return, any benefits availed or obtained by the
                  Customers under any scheme, offer, at the time of the
                  purchase, shall be reversed and/ or returned by the customer.
                  Premium if any paid will not be returned back to the customer.
                </li>
              </ol>

              <h4 className="font-semibold mt-6">
                Procedure for Return of DS product through Ecommerce
              </h4>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Customers who wish to return the DS product (except
                  accessories) must fill up the Request Form for Return
                  available at the DS website and/or at mobile application
                  within 7 days from the date of receiving the product.
                </li>
                <li>
                  Upon receiving the return request, DS will review it within 3
                  (Three) business days from the date of the receipt of the
                  return request and verify whether the product meets the
                  conditions for return. The customer will be notified by DS if
                  the return request is accepted or rejected. The decision of DS
                  in this regard shall be final and binding on the customer.
                </li>
                <li>
                  If the return request is approved, DS will either arrange for
                  a pickup of the product from the customer’s location or the
                  customer can choose to return the product directly to DS’s
                  office. Prior notice and arrangements will be made for the
                  return delivery to ensure the product is sent back correctly.
                </li>
                <li>
                  DS reserves the right to refuse to collect the returned
                  product in case the product is found tampered or used. For the
                  sake of clarity, return request approved shall not be
                  construed to mean the product is accepted by DS under its
                  return policy, the same shall be subject to eligibility and
                  independent verification by DS.
                </li>
                <li>
                  The pickup personnel will conduct a preliminary inspection to
                  assess the condition of the product. The customer is required
                  to sign a Indemnity letter before handing over the DS product
                  to the delivery personnel.
                </li>
                <li>
                  Once DS receives the returned product and confirms its
                  eligibility for return, the DS will initiate the process for
                  refund to the customer. The refund amount will be the original
                  amount paid by the customer, after adjustment of any premium
                  if paid will be deducted from the refund amount.
                </li>
                <li>
                  Upon the independent verification and eligibility check by DS,
                  if it is observed or DS is of the opinion that the such
                  product is tempered or used or damaged, in such case, DS shall
                  intimate the customer and reject the requests of the customer
                  for return or accept the return as per exchange policy.
                </li>
                <li>
                  If the DS product is found to be ineligible for return, the
                  customer shall be responsible for making arrangements to pick
                  up the DS product from the DS office at their own expense.
                </li>
                <li>
                  The final refund amount will be communicated to the customer
                  and will be processed within 14 (fourteen) business days from
                  the date when eligibility is confirmed by DS. The refund will
                  be credited to the Customer’s original mode of payment or as
                  per the agreed refund mechanism.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-8">
                B. For Offline PJ Stores
              </h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  To avail this facility of return policy, the Customer is
                  required to fill up the Return Request Form available at the
                  DS website and/or at mobile application. The customer then
                  required to approach original PJ store with the DS product
                  along with necessary invoice and DS certificates and
                  international certificate (if availed) of the product.
                </li>
                <li>
                  Divine Solitaires offers 7 (Seven) days from receiving the
                  product, return policy to every Customer for DS product sold
                  purchased from authorised Outlet of PJ of DS across India, if
                  the returned goods are in its original form and subject to QC
                  check.
                </li>
                <li>
                  The eligibility of the return of DS product shall be
                  communicated to the customer once product is verified by DS QC
                  department.
                </li>
                <li>
                  The customer shall be charged 3% on prevailing MRP for return
                  of the order as processing fees.
                </li>
                <li>
                  If the total value of DS product exceeding INR 10 lakhs,
                  refund amount shall be as per Buyback Policy.
                </li>
                <li>
                  Upon availing return, any benefits availed or obtained by the
                  Customers under any scheme, offer, at the time of the
                  purchase, shall be reversed and/ or returned by the customer.
                  Premium if any paid will not be returned back to the customer.
                </li>
              </ol>

              <h4 className="font-semibold mt-6">
                Procedure for Return of DS product through Offline PJ Stores
              </h4>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  The Customer must approach the original PJ store, showing the
                  details of return request form along with the DS Product for
                  review.
                </li>
                <li>
                  The PJ Store will review the product and send the product to
                  DS for QC Check to assess the eligibility of the DS product.
                </li>
                <li>DS will verify the product and do the QC check.</li>
                <li>
                  Upon the independent verification and eligibility check by DS,
                  if it is observed or DS is of the opinion that the such
                  product is tempered or used or damaged, in such case, DS
                  reserves the right to reject returns.
                </li>
                <li>
                  The customer will be notified on acceptance and rejection of
                  the return request by DS.
                </li>
                <li>
                  Once DS receives the returned product and confirms its
                  eligibility for return, PJ can initiate the process of refund.
                  The refund amount will be the original amount paid by the
                  customer, less premium if any paid. Additionally, deduction of
                  3% processing fees based on the prevailing MRP of the product
                  from the refund amount.
                </li>
                <li>
                  The final refund amount will be communicated to the customer
                  by PJ.
                </li>
                <li>
                  If the DS product is found to be ineligible for return, the
                  customer shall be responsible for making arrangement to pick
                  up the DS product from the original PJ Outlet at their own
                  expense.
                </li>
                <li>
                  The refund will be processed within 14 (fourteen) business
                  days after eligibility of product is confirmed by PJ
                </li>
                <li>
                  The refund will be credited to the Customer’s original mode of
                  payment or as per the agreed refund mechanism
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-left">
                III. Shipping Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Divine Solitaires delivers to across India to appx 24000 pin
                  codes. Delivery charge varies with each state or city. The
                  customer needs to specify the address to where the shipment
                  has to be made at the time of purchase. The Address provided
                  by the customer cannot be changed, under any circumstances,
                  once the DS product is shipped or dispatched. Any change in
                  the delivery address shall be communicated to Divine Solitaire
                  well in advance to the shipping date. Any inconsistencies in
                  this regard will result in delay in the delivery of DS product
                  and/or changing of the actual expenses incurred by Divine
                  Solitaire due to inconsistencies.
                </li>
                <li>
                  Products are shipped after the receipt of full payment against
                  the order except in case of COD.
                </li>
                <li>
                  DS ensures that all the dispatches are perfectly boxed and
                  wrapped with security tapes when they are dispatched from our
                  order-processing unit. However, DS cannot ensure the handling
                  and damage caused in transit, if any, by courier companies
                  before reaching to the Customer. The Customers, therefore,
                  shall NOT accept any damaged or tampered shipments as it will
                  then be the responsibility of the recipient in case any
                  product is missing.
                </li>
                <li>
                  Orders can be delivered to only Residential and Commercial
                  Locations mentioned by Customer while placing the order. The
                  delivery of the orders cannot be made to any public places
                  like Malls, Hotels, Restaurants, Hostel or nearby streets etc.
                </li>
                <li>
                  Divine Solitaires (DS) shall be liable for the product only
                  until it is delivered to the customer at the designated
                  delivery address. Once the product is delivered and accepted
                  by the customer, DS shall not be responsible or liable for any
                  loss, damage, or defect that occurs after delivery, including
                  but not limited to mishandling, improper storage, or any other
                  cause outside DS&apos;s control.
                </li>
                <li>
                  Customers are requested to keep either of the below mentioned
                  Proof of Identity handy to be shown to the courier person
                  while receiving the package.
                  <ul className="list-none pl-5 [&>li]:relative [&>li]:pl-6 [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:font-bold [&>li::before]:content-[attr(data-marker)]">
                    <li data-marker="a)">Aadhar Card</li>
                    <li data-marker="b)">PAN Card</li>
                    <li data-marker="c)">Passport</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-left">
                IV. PYDS (“Plan Your Dream Solitaire”)
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  PYDS is a scheme applicable to only round shaped diamond of a
                  specific size bracket, colour & clarity. Once the diamond is
                  booked, the customer cannot change its combination.
                </li>
                <li>
                  The Customer shall make 20% payment at the time of booking and
                  the rest 80% in 10 equal monthly instalments.
                </li>
                <li>
                  Customer can purchase the diamond before the maturity by
                  paying the balance amount in a single payment, provided they
                  notify Divine Solitaires in advance.
                </li>
                <li>
                  Post completion of 3 months, even in case of pre-maturity
                  purchase price protection will be provided to customer i.e.
                  Lower of the NSTPL (Nationwide Standard and Transparent Price
                  List) rates on the date of booking and the date of final
                  purchase will be applicable
                </li>
                <li>
                  If the Customer wants to terminate the scheme without making
                  the balance payments, then the Scheme becomes void. In such
                  cases, the customer is required to explore the options
                  outlined below:
                  <p className="text-base md:text-base font-bold text-left">
                    Options with Customer on termination:
                  </p>
                  <ul className="list-[lower-roman] list-inside pl-5 mt-2">
                    <li>
                      Buy any DS product worth the amount already paid as per
                      the NSTPL prices prevailing as on date of termination
                      shall be applicable.
                    </li>
                    <li>
                      <strong>If opted for refund:</strong>
                      <ul className="list-[lower-alpha] list-inside pl-5 mt-2">
                        <li>
                          Customer will get the refund as per the buyback policy
                        </li>
                        <li>The buyback charges will be on the booked value</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Delay in payment by Customer:</strong>
                  <ul className="list-[lower-roman] list-inside pl-5 mt-2">
                    <li>
                      Interest @ 18% pa will be charged if the instalment amount
                      is delayed beyond the due date.
                    </li>
                    <li>
                      If more than 3 instalments remain due and unpaid by the
                      Customers, DS reserves the rights to terminate PYDS. The
                      amount so deposited will either be forfeited by DS or the
                      customer will get an option to buy other DS product worth
                      the amount already paid.
                    </li>
                  </ul>
                </li>
                <li>
                  At the time of maturity, DS products may vary in size compared
                  to booked size. The cost difference of this variance will be
                  adjusted in the last instalment.
                </li>
                <li>
                  Buyback and Upgrade policy shall be applicable for DS product
                  purchased under PYDS scheme once full amount is paid by the
                  Customer.
                </li>
              </ol>

              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                V. Buyback Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  The Product which are branded and certified as DS product
                  (except accessories) are only eligible for buyback.
                </li>
                <li>
                  The Customers who have registered with DS and accepted the
                  terms and condition via app or website or through any other
                  method are eligible for Buyback, after 30 days from
                  registration.
                </li>
                <li>
                  Buyback on DS products gifted/discounted will be subject to
                  the lock in period for 2 years from the date of purchase,
                  unless specifically mentioned.
                </li>
                <li>
                  Buyback will be calculated at 90% of the prevailing price as
                  per NSTPL for all Diamonds including DSD, SD and Diamond coin.
                </li>
                <li>
                  Buyback for Gem Stones shall be at 80% of prevailing market
                  price.
                </li>
                <li>
                  The price of all metals will be as per the prevailing market
                  price. Making and designs will not be considered.
                </li>
                <li>
                  If Buyback happens from different PJ instead of original PJ,
                  the Customers shall be charged with 10% of the administrative
                  charges which shall be deducted from the buyback amount.
                  Provided If Buyback of Diamond coin happens from different PJ
                  instead of original PJ, 10% of the administrative charges will
                  not be charged.
                </li>
                <li>
                  The amount mentioned in the buyback section of verify and
                  track for a particular product on the day of eligibility
                  confirmation for Buyback by DS, will be treated as the final
                  buyback amount overriding all other calculations. It will also
                  include buyback amount of any precious metals or stones not
                  covered herein.
                </li>
                <li>
                  Divine Solitaires reserves the right to confiscate any pirated
                  product submitted by Customer for Buyback as DS product and
                  take appropriate legal action against such customer.
                </li>
                <li>
                  The fulfilment of buyback payment above Rs. 20 lacs per
                  customer will be communicated at the time of buyback.
                </li>
                <li>All applicable taxes to be borne by the Customer.</li>
                <li>
                  Buyback amount will be paid only to those customers in whose
                  name invoice is raised.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-6 mb-2">Procedure:</h3>
              <ol className="list-[lower-roman] list-inside pl-5 space-y-2 ">
                <li>
                  For any Buyback, Customer is required to fill up the Buyback
                  Request Form available at the DS website and/or at mobile
                  application 7 (seven) days prior to handing over the DS
                  products at any of the Partner Jeweller stores or DS head
                  office.
                </li>
                <li>
                  For any Buyback, following items need to be submitted to DS:
                  <ul className="list-none pl-6 mt-2 [&>li]:relative [&>li]:pl-6 [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:content-[attr(data-marker)]">
                    <li data-marker="a)">
                      The DS product in its original condition as sold without
                      any alteration / damage
                    </li>
                    <li data-marker="b)">
                      Original product certificates, both Divine and
                      international (if availed)
                    </li>
                    <li data-marker="c)">Original Invoice</li>
                    <li data-marker="d)">PAN card of the Customer</li>
                    <li data-marker="e)">
                      <strong>In case of Buyback directly with DS:</strong> The
                      Customer must provide a cancelled cheque (a cheque with
                      &quot;cancelled&quot; written across it to DS Buyback
                      amount will be credited directly to the account of the
                      Customer.
                    </li>
                  </ul>
                </li>
                <li>
                  On receiving complete Buyback request, DS will take 7 (seven)
                  business days to verify & confirm the product eligibility sent
                  by Customer and DS reserves the right to exercise discretion
                  in permitting buyback.
                </li>
                <li>
                  Charges will be applicable for the loss of any certificate
                  availed at the time of sale. For DS certificate – INR 500/- &
                  for any international lab certificate – INR 5000/- per carat
                </li>
                <li>
                  On receiving the eligibility confirmation from DS with the
                  calculations, Customer needs to confirm within 48 hours to
                  proceed for buyback. If confirmation not received within the
                  stipulated time, it will be considered as cancelled request
                  and logistic charges will be recovered from the customer and
                  also the same product will not be eligible for Buyback for
                  next 3 months.
                </li>
                <li>
                  PJ will make the payment of Buyback amount to customer, within
                  14 days of eligibility confirmation for Buyback by DS.
                </li>
              </ol>

              <ol start={13} className="list-decimal space-y-2 pl-5">
                <li>
                  DS is in the business of selling diamonds and jewellery. None
                  of its products should be treated as a financial instrument.
                </li>
                <li>
                  All Transactions are complete when DS product is delivered to
                  Customer against payment. Buyback is a feature provided by DS
                  to its Customers and not a financial obligation either on DS
                  or its associates.
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                VI. Upgrade Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  For availing the facility of Upgrade, Customer has to fill up
                  the Upgrade Request Form available at the DS website and/or at
                  mobile application.
                </li>
                <li>
                  The Customers who have registered with DS and accepted the
                  terms and condition via app or website or through any other
                  method are eligible for Upgrade, after 30 days from
                  registration.
                </li>
                <li>
                  Customer must upgrade by 50% to the existing value of his
                  currently owned DS product or INR 35,000/- whichever is higher
                </li>
                <li>
                  Incase of Diamond coin customer can upgrade to new DS product
                  of Equal or Higher Value.
                </li>
                <li>
                  Customer can upgrade only 1(one) DS product against 1(one) DS
                  product
                </li>
                <li>
                  Accessories attached to DS products are not eligible to
                  upgrade.
                </li>
                <li>
                  DS or/and International Certificate is mandatory for any
                  upgrade of DS product.
                </li>
                <li>
                  Before accepting the upgrade request, DS will first conduct QC
                  check of the Old product and confirms its eligibility for
                  upgrade.
                </li>
                <li>
                  The price prevailing on the day of eligibility confirmations
                  will be applicable for both the original and newly purchased
                  products/s.
                </li>
                <li>
                  The amount mentioned in the upgrade section of verify and
                  track for a particular product on the day of eligibility
                  confirmation for upgrade by DS, will be treated as the final
                  upgrade amount overriding all other calculations.
                </li>
                <li>
                  Incase of upgrade of DS products purchased under any
                  Scheme/offer/Gifted products, customer can upgrade as many
                  times as they wish, provided buyback and exchange restriction
                  will be continued on the upgraded product from the date of
                  first purchase of DS product.
                </li>
                <li>
                  The benefit obtained by Customers under any scheme, offer, or
                  through premium or discount available at the time of purchase,
                  shall not be considered for upgrade policy. Such benefit shall
                  be reversed, and the value will be prevailing price at the
                  time of purchase, without considering any benefits previously
                  applied.
                </li>
                <li>All applicable taxes to be borne by the Customer.</li>
                <li>
                  Divine Solitaires certificate must be returned along with the
                  third-party International Laboratory certificate, if availed
                  by the Customer.
                </li>
                <li>
                  In case if original certificate is lost, Customer has lost or
                  misplaced the certificate then they will be charged Rs.500/-
                  for a duplicate DS certificate & INR 5000/- per carat for the
                  third party international certificate (GIA/IGI/Any)
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Procedure for Upgrade
              </h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  For availing the facility of Upgrade, Customer has to fill up
                  the upgrade Request Form available at the DS website and/or at
                  mobile application 7 (seven) days prior to handing over the DS
                  products (except accessories) at any of the Partner Jeweller
                  stores or DS head office.
                </li>
                <li>
                  For the upgrade to proceed, the Customer must provide the
                  complete form along with the following:
                  <ul className="list-none pl-6 mt-2 [&>li]:relative [&>li]:pl-6 [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:content-[attr(data-marker)]">
                    <li data-marker="a)">
                      The DS Product in its original form.
                    </li>
                    <li data-marker="b)">
                      The Original Invoice issued at the time of purchase.
                    </li>
                    <li data-marker="c)">
                      DS or/and International Certificate if availed
                    </li>
                  </ul>
                </li>
                <li>
                  The Customer shall make arrangement for sending the product to
                  the DS head office or at any of DS PJ outlet for upgrade at
                  its own expenses.
                </li>
                <li>
                  On receiving complete Upgrade request, DS will take 3 (three)
                  business days to verify & confirm the product eligibility sent
                  by Customer and DS reserves the right to exercise discretion
                  in permitting Upgrade.
                </li>
                <li>
                  If the DS product is found to be ineligible for upgrade, the
                  customer shall be responsible for making arrangement to pick
                  up the DS product from the DS head office or DS PJ outlet
                  (wherever the original product was handed over).
                </li>
                <li>
                  Post confirmation of the Upgrade eligibility, the Customer
                  will pay differential amount.
                </li>
                <li>
                  After the Differential amount is paid by the customer, the
                  upgrade product will be shipped/handed over to the customer.
                </li>
                <li>
                  The new invoice shall also be provided to the customer along
                  with the upgrade DS product.
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto  mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                VII. Exchange Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  The Customers who have registered with DS and accepted the
                  terms and condition via app or website or through any other
                  method are eligible for Exchange, after 30 days from
                  registration.
                </li>
                <li>
                  One DS Product (except accessories) can be exchanged against
                  one DS product having the same price or higher.
                </li>
                <li>
                  Customer can avail exchange at the original PJ or any other
                  authorised DS PJ Outlet across India.
                </li>
                <li>
                  Customer will have to fill up the exchange request form
                  available at DS website and/or mobile app.
                </li>
                <li>
                  97% of prevailing price of DSD & SD as per NSTPL & market
                  price of metal will be considered to calculate exchange value
                  of the current product owned by Customer.
                </li>
                <li>
                  If exchange happens from different PJ instead of original PJ,
                  the Customers shall be charged with 10% of the administrative
                  charges which shall be deducted from the exchange amount.
                </li>
                <li>
                  Exchange on DS products sold as gift or discounted will be
                  subject to the lock in period for 2 years from the date of
                  purchase, unless specifically mentioned.
                </li>
                <li>
                  Before accepting the exchange request, DS will first conduct
                  QC check of the Old product and confirms its eligibility for
                  exchange.
                </li>
                <li>
                  The amount mentioned in the exchange section of verify and
                  track for a particular product on the day of eligibility
                  confirmation for exchange by DS, will be treated as the final
                  exchange amount overriding all other calculations.
                </li>
                <li>
                  Customized DS product are not eligible for Exchange Request.
                </li>
                <li>
                  The benefit obtained by Customers under any scheme, offer, or
                  through premium or discount available at the time of purchase,
                  shall not be considered for exchange policy. Such benefit
                  shall be reversed, and the exchange value will be prevailing
                  price at the time of purchase, without considering any
                  benefits previously applied.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Procedure for exchange
              </h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  For availing the facility of Exchange, Customer has to fill up
                  the Exchange Request Form available at the DS website and/or
                  at mobile 7 (seven) days prior to handing over the DS products
                  at any of the Partner Jeweller stores or DS head office.
                </li>
                <li>
                  For the exchange to proceed, the Customer must provide the
                  complete form along with the following:
                  <ul className="list-none pl-6 mt-2 [&>li]:relative [&>li]:pl-6 [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:content-[attr(data-marker)]">
                    <li data-marker="a)">
                      The DS Product in its original form.
                    </li>
                    <li data-marker="b)">
                      The Original Invoice issued at the time of purchase.
                    </li>
                    <li data-marker="c)">
                      DS or/and International Certificate if availed
                    </li>
                  </ul>
                </li>
                <li>
                  On receiving complete Exchange request, DS will take 3 (three)
                  business days to verify & confirm the product eligibility and
                  DS reserves the right to exercise discretion in permitting
                  Exchange.
                </li>
                <li>
                  If the DS Product does not meet the stipulated eligibility
                  requirements or if the requisite documentation is incomplete
                  or missing, DS reserves the right to decline the exchange
                  request.
                </li>
                <li>
                  Post confirmation of the Exchange eligibility, the Customer
                  will pay differential amount if any,
                </li>
                <li>
                  After the Differential amount is paid by the customer, the new
                  product will be shipped/handed over to the customer.
                </li>
                <li>
                  The new invoice shall also be provided to the customer along
                  with the new DS product.
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                VIII. Message Inscription Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Special message can be Inscribed either in the DSD or in the
                  DSJ sold to the Customer upon their request. In this regard,
                  the customer shall provide the message in writing.
                </li>
                <li>Charges for inscription - INR 2500/- per solitaire</li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto  mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                VIII. Message Inscription Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5 ">
                <li>
                  Special message can be Inscribed either in the DSD or in the
                  DSJ sold to the Customer upon their request. In this regard,
                  the customer shall provide the message in writing.
                </li>
                <li>Charges for inscription - INR 2500/- per solitaire</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                IX. Customer Insurance Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Period of free insurance - Divine Solitaires provides
                  First-year free insurance for every DS product sold.
                </li>
                <li>
                  DS or any of the Partner Jeweller of DS shall not be liable
                  for any claims, customer shall put claim directly with the
                  insurance company
                </li>
                <li>
                  Primarily the Insurance cover against the risks such as Theft
                  and Burglary unless policy covers any other claims.
                </li>
                <li>
                  Documents to be required at the time of claim:
                  <ul className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                    <li>Original Invoice/Purchase Bill</li>
                    <li>
                      FIR or complaint letter duly acknowledge by police
                      authorities
                    </li>
                    <li>Detailed statement on how incident has happened</li>
                    <li>KYC of Customer</li>
                    <li>Bank details of jewellers</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto  mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                VIII. Message Inscription Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Special message can be Inscribed either in the DSD or in the
                  DSJ sold to the Customer upon their request. In this regard,
                  the customer shall provide the message in writing.
                </li>
                <li>Charges for inscription - INR 2500/- per solitaire</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                IX. Customer Insurance Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Period of free insurance - Divine Solitaires provides
                  First-year free insurance for every DS product sold.
                </li>
                <li>
                  DS or any of the Partner Jeweller of DS shall not be liable
                  for any claims, customer shall put claim directly with the
                  insurance company
                </li>
                <li>
                  Primarily the Insurance cover against the risks such as Theft
                  and Burglary unless policy covers any other claims.
                </li>
                <li>
                  Documents to be required at the time of claim:
                  <ul className="list-[lower-alpha] list-inside pl-4 mt-2 space-y-1">
                    <li>Original Invoice/Purchase Bill</li>
                    <li>
                      FIR or complaint letter duly acknowledge by police
                      authorities
                    </li>
                    <li>Detailed statement on how incident has happened</li>
                    <li>KYC of Customer</li>
                    <li>Bank details of jewellers</li>
                  </ul>
                </li>
              </ol>

              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                X. Certificate Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  For every DS product, DS Laboratory will provide certificate.
                  For Non DSJ product, only DSD certificate will be provided by
                  DS.
                </li>
                <li>
                  DS certificate will be the final authority for grading &
                  valuation of the diamond.
                </li>
                <li>
                  At the time of Upgrade, Exchange & Buyback, Divine Solitaires
                  certificate must be returned along with the third party
                  International Laboratory certificate, if acquired by the
                  Customers.
                </li>
                <li>
                  Any product with 0.50 ct or above size of DSD, Divine
                  Solitaires certificate and Third Party International
                  Laboratory Certificate will be uploaded in Verify and Track of
                  DS mobile application (V & T) and upon the request of Customer
                  physical copy of the certificate will be provided.
                </li>
                <li>
                  Any product with 0.30 ct to 0.50 ct size of DSD, Divine
                  Solitaires Certificate will be available & uploaded at V & T.
                  Third Party International Laboratory certificate may be
                  uploaded in V & T and upon the request of Customer &
                  availability at V & T, physical copy of the same will be
                  provided.
                </li>
                <li>
                  Any product with {"<"}0.30 ct, only DS certificate will be
                  provided.
                </li>
                <li>
                  Third Party International Laboratory Certificate will not be
                  provided for any product having less than 0.30 ct.
                </li>
              </ol>
            </div>
          </div>

          <div className="xl:max-w-5xl 2xl:max-w-6xl m-auto  mt-10 mb-6 px-4">
            <div className="prose max-w-none text-gray-800">
              <h2 className="text-xl md:text-2xl font-bold mt-10 mb-6 text-left">
                XI. Pricing Policy
              </h2>

              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  The prices mentioned in the NSTPL are the maximum retail
                  prices (excluding GST) payable by the Customer across the
                  country.
                </li>
                <li>
                  This NSTPL will be applicable to all available DS product,
                  Buyback, Upgrade and Exchange throughout DS partner network.
                </li>
                <li>
                  A Premium Size Table (% increase above NSTPL) is available for
                  any order of special size which are not available in stock and
                  Customer wishes to buy by placing an order. Premium charges
                  will be applicable as mentioned in NSTPL.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsCondition;
