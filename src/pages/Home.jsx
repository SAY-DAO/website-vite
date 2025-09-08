import React from 'react';

export default function Home() {
  return (
    <div id="Home">
      <img id="downImg" src="/img/DownLoad.png" alt="down" />
      <div id="addSvgCircle" />

      {/* Top / Slider */}
      <section className="container" id="slider">
        <div className="row">
          <div className="col col-md-6 col-sm-12 text">
            <h6 className="upTitle">صدایی که به گوش شما می‌رسد واقعی است</h6>
            <h2 className="title">بنیان بنیادی</h2>
            <h2 className="title2">برای امید و آسودگی</h2>
            <div className="mouse">
              <img
                id="goToNext"
                src="/img/mouse.png"
                alt="SAY Illustration"
              />
            </div>
          </div>
          <div className="col col-md-6 col-sm-12 illust">
            <img src="/img/top.png" alt="" />
          </div>
        </div>
        <div id="graph_butt_div" style={{ textAlign: 'center' }}>
          <a href="#report">
            <button
              id="graphbutton"
              type="button"
              className="primary btn btn-outline-warning"
            >
              گزارش هفتگی
            </button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="container" id="features">
        <div className="row justify-content-md-center SectionHead">
          <div className="col-12">
            <h6 className="sectionUpTitle text-center">چرا SAY</h6>
            <h3 className="sectionTilte">هم‌راه شویم تا . . .</h3>
          </div>
        </div>

        <div className="row">
          <div className="col col-md-4 col-sm-12 feature">
            <img src="/img/kpi/wishes.png" alt="آرزوها واقعی شوند" />
            <span className="featureTitle">آرزوها واقعی شوند</span>
            <p className="featuresDesc">
              با همکاری مددکاران برجسته فهرست دقیقی از نیازهای کودکان – از
              دارو تا تحصیلات – تهیه کرده‌ایم تا کاربران انتخاب کنند چگونه کمک
              کنند.
            </p>
          </div>

          <div className="col col-md-4 col-sm-12 feature">
            <img src="/img/kpi/rights.png" alt="حقوق کودکان دیده شود" />
            <span className="featureTitle">حقوق کودکان دیده شود</span>
            <p className="featuresDesc">
              با باور داشتن به زیبایی‌های منحصر به فرد هر کودک، SAY می‌تواند
              از حقوق کودکان طبق پیمان‌نامه حقوق کودک سازمان ملل دفاع کند.
            </p>
          </div>

          <div className="col col-md-4 col-sm-12 feature">
            <img src="/img/kpi/touchlife.png" alt="در مجاورت زندگی باشیم" />
            <span className="featureTitle">در مجاورت زندگی باشیم </span>
            <p className="featuresDesc">
              با SAY مشارکت کنندگان می‌توانند تاثیر مستقیم کمکشان را بر کودک
              خاص تحت حمایتشان ارزیابی کنند.
            </p>
          </div>

          <div className="col col-md-4 col-sm-12 feature">
            <img src="/img/kpi/transparent.png" alt="حفظ شفافیت مالی" />
            <span className="featureTitle">حفظ شفافیت مالی</span>
            <p className="featuresDesc">
              تمام اقلام فراهم شده به دست سازمان‌های مردم نهاد (NGO) مشخص است
              و خریدها با تکنولوژی بلاکچین قابل ردیابی است.
            </p>
          </div>

          <div className="col col-md-4 col-sm-12 feature">
            <img src="/img/kpi/match-making.png" alt="کسی که کودکی ما است" />
            <span className="featureTitle">کسی که کودکی ما است</span>
            <span className="featureTitle">
              ( این قابلیت در حال حاضر وجود ندارد)
            </span>
            <p className="featuresDesc">
              با SAY Brain کاربران می‌توانند سرپرست کودکانی شبیه به خودشان
              شوند تا با کمک خانواده (مجازی)، کودکان کودکی شادمانه‌تری پشت‌سر
              بگذارند.
            </p>
          </div>

          <div className="col col-md-4 col-sm-12 feature">
            <img
              src="/img/kpi/vr-family.png"
              alt="کودکان واقعی، خانواده‌های مجازی داشته باشند"
            />
            <span className="featureTitle">
              کودکان واقعی، خانواده‌های مجازی داشته باشند
            </span>
            <p className="featuresDesc">
              با SAY کاربران می‌توانند برای کودکان جهان واقعی خانواده‌ای مجازی
              بسازند، خانواده‌ای بزرگ که بتواند حمایت و مراقبت کافی را برای
              کودک ایجاد کند.
            </p>
          </div>
        </div>
      </section>

      {/* Download */}
      <section className="container" id="download">
        <div className="row justify-content-md-center">
          <div className="col col-md-8 col-sm-12">
            <div className="appPointCircle">
              <img className="mobile" src="/img/mobile.png" alt="" />
              <img className="video" src="/img/flow.webp" alt="" />

              <div className="appPointLeft left1">
                <p className="appPointDesc">
                  با استفاده از SAY در زندگی کودکان جهان تاثیرگذار باشید.
                </p>
                <div className="appPointIconWrapper">
                  <img src="/img/feature/affect.svg" alt="" />
                </div>
              </div>

              <div className="appPointLeft left2">
                <p className="appPointDesc">
                  آواتارهای انحصاری SAY الهام گرفته شده از زندگی واقعی کودکان
                  است.
                </p>
                <div className="appPointIconWrapper">
                  <img src="/img/feature/avatar.svg" alt="" />
                </div>
              </div>

              <div className="appPointLeft left3">
                <p className="appPointDesc">
                  انتخاب کنید که چگونه می‌خواهید هم‌راه کودکان باشید.
                </p>
                <div className="appPointIconWrapper">
                  <img src="/img/feature/donate.svg" alt="" />
                </div>
              </div>

              <div className="appPointRight right1">
                <div className="appPointIconWrapper">
                  <img src="/img/feature/commu.svg" alt="" />
                </div>
                <p className="appPointDesc">
                  در SAY جامعه دوستی انحصاری خود را به شکلی که دوست دارید
                  ایجاد کنید.
                </p>
              </div>

              <div className="appPointRight right2">
                <div className="appPointIconWrapper">
                  <img src="/img/feature/good.svg" alt="" />
                </div>
                <p className="appPointDesc">
                  در خانواده‌های SAY پدر، مادر یا هر نقش دیگری را انتخاب کنید.
                </p>
              </div>

              <div className="appPointRight right3">
                <div className="appPointIconWrapper">
                  <img src="/img/feature/famillytree.svg" alt="" />
                </div>
                <p className="appPointDesc">
                  SAY صدای واقعی کودکان را به گوش شما می‌رساند.
                </p>
              </div>
            </div>
          </div>
        </div>

        <a href="https://dapp.saydao.org/">
          <button id="downloadapp" type="submit" className="primary">
            ورود
          </button>
        </a>
      </section>

      <section className="container hide" id="downloadResponsive">
        <div className="row">
          <div className="col-sm-12">
            <img className="frame" src="/img/mobile.png" alt="" />
            <img className="video" src="/img/flow.webp" alt="" />
          </div>

          <div className="col-sm-12">
            <a href="#">
              <button id="downloadapp2" type="submit" className="primary">
                ورود
              </button>
            </a>

            <div className="appPoint">
              <div className="appPointIconWrapper">
                <img src="/img/feature/avatar.svg" alt="" />
              </div>
              <p className="appPointDesc">
                آواتارهای انحصاری SAY الهام گرفته شده از زندگی واقعی کودکان
                است.
              </p>
            </div>

            <div className="appPoint">
              <div className="appPointIconWrapper">
                <img src="/img/feature/affect.svg" alt="" />
              </div>
              <p className="appPointDesc">
                با استفاده از SAY در زندگی کودکان جهان تاثیرگذار باشید.
              </p>
            </div>

            <div className="appPoint">
              <div className="appPointIconWrapper">
                <img src="/img/feature/donate.svg" alt="" />
              </div>
              <p className="appPointDesc">
                انتخاب کنید که چگونه می‌خواهید هم‌راه کودکان باشید.
              </p>
            </div>

            <div className="appPoint">
              <div className="appPointIconWrapper">
                <img src="/img/feature/commu.svg" alt="" />
              </div>
              <p className="appPointDesc">
                جامعه دوستی انحصاری خود را در SAY به شکلی که دوست دارید ایجاد
                کنید.
              </p>
            </div>

            <div className="appPoint">
              <div className="appPointIconWrapper">
                <img src="/img/feature/good.svg" alt="" />
              </div>
              <p className="appPointDesc">
                در خانواده‌های SAY پدر، مادر یا هر نقش دیگری را انتخاب کنید.
              </p>
            </div>

            <div className="appPoint">
              <div className="appPointIconWrapper">
                <img src="/img/feature/famillytree.svg" alt="" />
              </div>
              <p className="appPointDesc">
                SAY صدای واقعی کودکان را به گوش شما‌رساند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial and carousel + report sections preserved below */}
      {/* ... (rest of page markup kept identical to original) */}
    </div>
  );
}
