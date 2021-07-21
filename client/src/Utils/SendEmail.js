// const { smtpTransport } = require('./config/email');
// const nodemailer = require('nodemailer');

// /* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */
// var generateRandom = function (min, max) {
//     var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
//     return ranNum;
// }

// // transporter 생성
// let transporter = nodemailer.createTransport({

//     // host: "mail.회사.계정.입력" *** mail. <-요게 핵심이었다!
//     host: "mail.abc.co.kr",

//     // 보안 무시
//     port: 587,

//     // 회사 도메인 내 계정 및 비밀번호
//     auth: {
//         user: "myid@abc.co.kr",
//         pass: "mypassword",
//     },

//     // 서명받지 않은 사이트의 요청도 받겠다.
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// // 메일 관련 옵션
// let mailOptions = {
//     // 발송 메일 주소 (위에서 작성한 회사 계정 아이디)
//     from: "myid@abc.co.kr",

//     // 수신 메일 주소
//     to: "receiverid@domain.com",

//     // 제목
//     subject: "인증 메일입니다.",

//     // 인증 URL
//     html: `<p>아래의 링크를 클릭하시면 인증이 완료됩니다.</p>
//     <a href='http://localhost:3000/auth?etc'>인증하기</a>`,
// };

// // 메일 보내기
// transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//         // 메일 보내기 에러 발생 시, 콘솔 찍어보기
//         console.log("메일보내기 에러쓰");
//         console.log(err);
//     } else {
//         // 성공했다!
//         console.log("Email sent: " + info.response);
//     }
// });

// // export const auth = {
// //     SendEmail: async (req, res) => {
// //         const number = generateRandom(111111, 999999)

// //         const { sendEmail } = req.body;

// //         const mailOptions = {
// //             from: "정욱이네러버덕",
// //             to: sendEmail,
// //             subject: "[러버덕]인증 관련 이메일 입니다",
// //             text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
// //         };

// //         const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
// //             if (error) {
// //                 return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL))
// //             } else {
// //                 /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
// //                 return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
// //                     number: number
// //                 }))
// //             }
// //             smtpTransport.close();
// //         });
// //     }
// // }