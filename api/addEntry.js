async function addEntry(type) {
  const name = document.getElementById("name-select").value;
  const category = document.getElementById("mat-type").value;
  const matName = document.getElementById("mat-name").value;
  const color = document.getElementById("mat-color").value;
  const quantity = document.getElementById("quantity").value;
  const notes = document.getElementById("notes").value;

  const entry = { name, category, matName, color, quantity, type, notes };

  try {
    // Vercel 서버리스 API 경로로 요청 보내기
    const response = await fetch("/api/addEntry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry)
    });

    if (response.ok) {
      alert("데이터가 성공적으로 추가되었습니다!");
      loadEntries();  // 데이터 로드 함수 호출
    } else {
      const errorData = await response.json();
      alert("데이터 추가 실패: " + errorData.message);
    }
  } catch (error) {
    console.error("API 호출 오류:", error);
    alert("데이터 추가 실패: " + error.message);
  }
}
