import { useEffect } from "react";

const Terms = () => {
    
    useEffect(() => {
            window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                <h1 className="text-2xl mt-6 sm:text-3xl font-bold mb-6 sm:mb-8 leading-tight">
                    서비스 이용약관
                </h1>
                <div className="bg-white rounded-lg shadow-sm p-5 sm:p-8 space-y-6 break-words">
                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제1조(목적)
                        </h2>
                        <p className=" leading-relaxed">
                        본 약관은 Amuse8 Company(이하 "회사")가 제공하는 Ceep 서비스(이하 "서비스")의 이용과 관련하여
                        문서 관리, 정보 수집 및 저장, AI 기반 분류 서비스 등에 대한 회사와 이용자의 권리·의무 및 책임사항,
                        기타 필요한 사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제2조(용어의 정의)
                        </h2>

                        <ul className="list-decimal ml-6 space-y-2 mb-8">
                        <li>'유료서비스'라 함은 회사가 유료로 제공하는 제반 서비스를 의미합니다.</li>
                        <li>
                            '결제'란 회사가 제공하는 유료서비스를 이용하기 위하여 회원이 지불수단을 선택하고, 금융정보를
                            입력하는 행위를 말합니다.
                        </li>
                        <li>
                            '콘텐츠'란 정보통신망법의 규정에 따라 정보통신망에서 사용되는 부호·문자·음성·음향·이미지 또는
                            영상 등으로 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 말합니다.
                        </li>
                        </ul>

                        <p className="ml-6">
                        가. 회사가 제공하는 구체적인 서비스의 내용은 본 약관에 별도로 첨부된 '별표. 서비스의 내용'과 같습니다.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제3조(정보의 제공 및 광고의 게재)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>
                            회사는 이용자가 서비스 이용 중 필요하다고 인정되는 각종 정보 및 광고를 배너 게재, 전자우편(E-Mail),
                            휴대폰 메세지, 전화, 우편 등의 방법으로 이용자에게 제공(또는 전송)할 수 있습니다. 다만, 이용자는 이를
                            원하지 않을 경우 회사가 제공하는 방법에 따라 수신을 거부할 수 있습니다.
                        </li>
                        <li>
                            이용자가 수신 거부를 한 경우에도 이용약관, 개인정보보호정책, 기타 이용자의 이익에 영향을 미칠 수 있는
                            중요한 사항의 변경 등 '정보통신망이용촉진 및 정보보호 등에 관한 법률'에서 정하는 사유 등 이용자가
                            반드시 알고 있어야 하는 사항에 대하여는 전자우편 등의 방법으로 정보를 제공할 수 있습니다.
                        </li>
                        <li>
                            제1항 단서에 따라 이용자가 수신 거부 조치를 취한 경우 이로 인하여 회사가 거래 관련 정보, 이용 문의에
                            대한 답변 등의 정보를 전달하지 못한 경우 회사는 이로 인한 책임이 없습니다.
                        </li>
                        <li>
                            회사는 '정보통신망법' 시행령에 따라 2년마다 영리 목적의 광고성 정보 전송에 대한 수신동의 여부를
                            확인합니다.
                        </li>
                        <li>
                            회사는 광고주의 판촉 활동에 이용자가 참여하거나, 거래의 결과로서 발생하는 손실 또는 손해에 대하여는
                            책임을 지지 않습니다.
                        </li>
                        </ol>
                    </section>
                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제4조 (유료서비스의 결제 등)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>
                            회사가 제공하는 유료서비스를 이용하는 경우 이용자는 이용대금을 납부하는 것을 원칙으로 합니다. 이 때
                            회사가 제공하는 유료서비스에 대한 이용요금의 결제방법은 아래 각 호와 같습니다.
                        </li>

                        <p className="ml-6">가. 선불카드, 직불카드, 신용카드 등의 각종 카드결제</p>
                        <p className="ml-6">나. ARS, 휴대전화등을 이용한 결제</p>
                        <p className="ml-6">
                            다. 폰뱅킹, 인터넷뱅킹, 온라인 무통장입금 등의 각종 계좌이체
                        </p>

                        <li>
                            회사는 이용자가 결제수단에 대해 정당한 사용권한을 가지고 있는지의 여부를 확인할 수 있으며, 이에 대한
                            확인이 완료될 때까지 거래 진행을 중지하거나, 확인이 불가한 해당 거래를 취소할 수 있습니다.
                        </li>
                        <li>
                            회사의 정책 및 제1항의 결제업체(이동통신사, 카드사 등) 및 결제대행업체의 기준에 따라 이용자 당월 누적
                            결제액 및 충전한도가 제한될 수 있습니다. 해당 기준을 초과한 경우 유료서비스의 추가 이용은 불가능 할 수있습니다.
                        </li>
                        <li>이용자가 대금의 지급이나 결제를 위하여 입력한 정보에 대한 책임은 이용자에게 있습니다.</li>
                        </ol>
                    </section>
                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제5조 (환불)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>이용자의 귀책사유로 결제를 취소, 환불하는 경우에는 다음의 절차에 따릅니다.</li>

                        <p className="ml-6">가. 1회로 이용 또는 구매가 완료되는 서비스는 환불이 불가능 합니다.</p>
                        <p className="ml-6">
                            나. 지속적으로 이용가능한 서비스는 이용일수에 해당하는 금액을 차감한 나머지 금액을 환불합니다.
                        </p>

                        <li>전항의 규정에도 불구하고 아래 각 호의 경우에는 결제한 전액을 환불합니다.</li>

                        <p className="ml-6">- 결제를 완료한 후 서비스 이용 내역이 없는 경우</p>
                        <p className="ml-6">- 서비스 장애 등 회사의 귀책사유로 서비스를 이용하지 못한 경우</p>
                        <p className="ml-6">- 구매한 서비스가 제공되지 않은 경우</p>
                        <p className="ml-6">
                            - 구매한 서비스가 표시 또는 광고 등과 상이하거나 현저한 차이가 있는 경우
                        </p>
                        <p className="ml-6">
                            - 서비스 자체의 결합으로 서비스 이용이 현저히 불가능 하였던 경우
                        </p>

                        <li>
                            회사는 환불시 이용대금의 결제수단과 동일한 방법으로 환불하는 것을 원칙으로 합니다. 다만, 동일한
                            결제수단으로 환불이 불가능한 경우 회사가 개별서비스에서 정하는 별도의 방법으로 환불합니다.
                        </li>
                        <li>
                            회사는 환불 의무가 발생한 날로부터 3영업일 내에 환불절차를 진행합니다. 다만, 환불을 위하여 이용자의
                            협조가 필요한 경우 이용자의 귀책사유로 환불이 지연된 경우 회사는 지연이자를 부담하지 않습니다.
                        </li>
                        <li>환불에 필요한 비용은 귀책사유가 있는 쪽이 부담합니다.</li>
                        <li>
                            제1항의 규정에도 불구하고 이용자가 직접 작성한 콘텐츠 및 회사의 제휴계약에 따라 제공된 저작물에 대 한
                            지식재산권은 회사에 귀속되지 않습니다.
                        </li>
                        </ol>
                    </section>
                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제6조 (저작물 저장 및 이용 동의)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>
                            이용자는 본 서비스를 통해 텍스트, 이미지, 문서 등 데이터를 저장하거나 공유할 수 있습니다. 본 서비스는
                            이용자의 저장한 콘텐츠를 안정적으로 보관하고 서비스 이용을 지원하기 위해 필요한 기술적 조치를 제공합니다.
                        </li>
                        <li>
                            이용자가 저장한 모든 콘텐츠에 대한 저작권 및 관련 권리는 이용자에게 있습니다. 본 서비스는 이용자의 별도
                            동의 없이 콘텐츠를 제3자에게 제공하거나 상업적으로 이용하지 않습니다.
                        </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제7조 (저작물의 2차 가공 및 재배포 관련 책임)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>
                            본 서비스를 통해 저장한 콘텐츠를 타인과 공유하거나 외부로 재배포, 2차 가공, 또는 상업적 목적으로
                            활용할 경우, 그로 인한 모든 법적 책임은 전적으로 이용자에게 있습니다.
                        </li>
                        <li>
                            본 서비스는 이용자의 콘텐츠 사용에 관여하지 않으며, 외부에서 발생하는 법적 분쟁에 대해 책임을 지지 않습니다.
                            콘텐츠 저장 및 사용 시 관련 법규를 준수하시길 바랍니다.
                        </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제8조 (서비스 이용 제한 및 면책)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>
                            본 서비스는 이용자가 제공한 콘텐츠를 기술적 문제, 데이터 손상, 기타 예상치 못한 상황으로 인해 저장하지
                            못하거나 손실이 발생할 경우 이에 대한 책임을 제한적으로만 부담합니다.
                        </li>
                        <li>중요한 데이터를 저장하거나 공유할 경우, 추가적으로 별도의 백업을 권장드립니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제9조 (회원의 책임 및 의무)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>이용자는 본 서비스를 이용하며 타인의 권리를 침해하거나 관련 법령을 위반하지 않도록 주의하셔야 합니다.</li>
                        <li>약관을 위반하여 발생하는 모든 결과는 이용자의 책임으로 귀속됩니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제10조 (콘텐츠의 관리)
                        </h2>

                        <ol className="list-decimal ml-6 space-y-2">
                        <li>
                            회원이 작성 또는 창작한 콘텐츠가 '개인정보보호법' 및 '저작권법' 등 관련 법에 위반되는 내용을 포함하는 경우,
                            관리자는 관련 법이 정한 절차에 따라 해당 콘텐츠의 게시중단 및 삭제 등을 요청할 수 있으며,
                            회사는 관련 법에 따라 조치를 취하여야 합니다.
                        </li>
                        <li>
                            회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련 법에
                            위반되는 경우에는 관련 법에 따라 해당 콘텐츠에 대해 임시 조치 등을 취할 수 있습니다.
                        </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        제11조 (관할법원 및 준거법)
                        </h2>
                        <p className="leading-relaxed">
                        서비스와 관련하여 분쟁이 발생한 경우 관할법원은 회사 소재지 관할법원으로 정하며, 준거 법은 대한민국의 법령을 적용합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        부칙
                        </h2>
                        <p className="leading-relaxed">
                        <span className="font-medium">제1조(시행일)</span> 본 약관은 2024.11.15.부터 시행됩니다.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
};

export default Terms;