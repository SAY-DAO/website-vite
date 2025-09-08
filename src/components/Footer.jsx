import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box component="footer">
      <section className="container" id="footer">
        <div className="row footer-data">
          <div className="col col-md-4" id="desc">
            <div className="row">
              <div className="col col-md-12 desc-wrapper">
                <p
                  id="dao-logo"
                  style={{
                    color: '#a1a1a1',
                    fontSize: '2.5em',
                    fontWeight: 200,
                  }}
                >
                  SAY DAO
                </p>
                <span className="footerspan">این کودک مجازی نیست</span>
              </div>
              <div className="col col-md-12 desc-wrapper">
                <p>
                  SAY استارت‌آپی ایرانی با رویکرد مسئولیت اجتماعی است تا نقطه
                  تلاقی تمام کسانی باشد که برای جهانی دوستانه‌تر تلاش می‌کنند؛
                  SAY با استفاده از تکنولوژیِ کوتاه‌ترین فاصله بین تمام کودکان
                  جهان و جامعه‌ای آگاه خواهد بود.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-md-4">
            <div className="row">
              <div className="col col-md-4">
                <a
                  referrerPolicy="origin"
                  target="_blank"
                  rel="noreferrer"
                  href="https://trustseal.enamad.ir/?id=429052&Code=d0gZMMNhHl8DJEbhxCGyJwqLXTvBfogC"
                >
                  <img
                    referrerPolicy="origin"
                    src="https://trustseal.enamad.ir/logo.aspx?id=429052&Code=d0gZMMNhHl8DJEbhxCGyJwqLXTvBfogC"
                    alt=""
                    style={{ cursor: 'pointer' }}
                    code="d0gZMMNhHl8DJEbhxCGyJwqLXTvBfogC"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="col col-md-4" id="links">
            <div className="row">
              <div className="col-md-6 link-wrapper">
                <ul>
                  <li className="title">شبکه‌های اجتماعی</li>
                  <li>
                    <a
                      href="https://github.com/SAY-DAO"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        style={{ width: '40%' }}
                        src="/img/footer/github.png"
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-md-6 link-wrapper">
                <ul>
                  <li className="title">لینک‌ها</li>
                  <li className="active">
                    <a href="index.html">خانه</a>
                  </li>
                  <li>
                    <a href="whatis.html">اول سلام</a>
                  </li>
                  <li>
                    <a href="about.html">درباره ‌ما</a>
                  </li>
                  <li>
                    <a href="contact.html">ارتباط‌ با ما</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row footer-copy">
          <div className="col-md-6 col-sm-12 copy-links">
            <div className="row">
              <div className="col-md-3 col-sm-6 language">
                <span>
                  <a className="active" href="en/index.html">
                    English
                  </a>
                  {' '}
                  -
                  {' '}
                  <a href="/">فارسی</a>
                </span>
              </div>
              <div className="col-md-9 col-sm-6 terms">
                <span>{/* reserved for terms/rights links */}</span>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12 copy-right">
            <span>
              کلیه حقوق این وبسایت متعلق به شرکت
              {' '}
              <a href="https://pendara.ir" target="_blank" rel="noreferrer">
                پندارآ
              </a>
              {' '}
              است. © 1398
            </span>
          </div>
        </div>
      </section>
      <Divider />
    </Box>
  );
}
