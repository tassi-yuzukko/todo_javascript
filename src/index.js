import "./styles.css";

// divタグを生成
function createListItemTag(text, button1, button2) {
  // liタグを生成
  const li = document.createElement("li");

  // divタグを生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグを生成
  const p = document.createElement("p");
  p.className = "list-inner";
  p.innerText = text;

  // タグを構成
  div.appendChild(p);
  if (typeof button1 !== "undefined") div.appendChild(button1);
  if (typeof button2 !== "undefined") div.appendChild(button2);
  li.appendChild(div);

  return li;
}

// 追加処理
function addTodo(text) {
  // 押されたらリストから自身を削除するボタン
  const createButtonDeleteFromList = (
    targetList /*削除対象のリスト名*/,
    buttonContext, // ボタンに付ける文字列
    onClicked /*ボタン押下時の処理*/
  ) => {
    const retButton = document.createElement("button");
    retButton.innerText = buttonContext;
    retButton.addEventListener("click", () => {
      // 押されたボタンの親タグ(li)をリストから削除
      const deleteTarget = retButton.parentNode.parentNode;
      document.getElementById(targetList).removeChild(deleteTarget);

      // 処理があれば実行
      if (typeof onClicked !== "undefined") onClicked();
    });

    return retButton;
  };

  // 完了ボタンのタグの作成
  const completeButton = createButtonDeleteFromList("incomplete-list", "完了", () => {
    // 戻すボタンのタグの作成
    const undoButton = createButtonDeleteFromList("completed-list", "戻す", () => {
      // 戻す
      addTodo(text);
    });
    // 完了対象を、完了したTODOに入れる
    document
      .getElementById("completed-list")
      .appendChild(createListItemTag(text, undoButton));
  });

  // 削除ボタンのタグ作成
  const deleteButton = createButtonDeleteFromList("incomplete-list", "削除");

  // 未完了のリストに追加
  document
    .getElementById("incomplete-list")
    .appendChild(createListItemTag(text, completeButton, deleteButton));
}

// 追加ボタン押下時の処理を登録
document.getElementById("add-button").addEventListener("click", () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  if (inputText === "") return;

  addTodo(inputText);
});
