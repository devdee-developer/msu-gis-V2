$(function () {
  
  changePage("analytics_page", function () {
    setTimeout(function () {
      initialAnalyticsPageFunc();
    }, 2000);
  });
  // showModal("modal-analytics");
  function initialAnalyticsPageFunc() {
    const chart_men = $("#chart-analytics-men");
    const chart_women = $("#chart-analytics-women");
    const data = {
      labels: ["มีปัญหา", "ปกติ", "รอประเมิน"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: ["#54D5BB", "#F53F4D", "rgb(255, 205, 86)"],
          hoverOffset: 0,
        },
      ],
    };
    const config = {
      type: "doughnut",
      data: data,
      options: {
        plugins: { legend: { display: false },
        labels: {
          render: 'label'
        }
        },
        responsive: true,
        cutout: "70%",
      },
    };
    var myChart = new Chart(chart_men, config);
    var myChart = new Chart(chart_women, config);
  }
});
