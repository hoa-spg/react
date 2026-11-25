// Quiz-Logik (generiert aus _build/build.py QUIZ_SCRIPT durch _build/tools/quiz_render.py)
document.querySelectorAll('.quiz').forEach((quiz) => {
  const fragen = [...quiz.querySelectorAll('.quiz-frage')];
  const score = quiz.querySelector('.quiz-score');
  const update = () => {
    const done = fragen.filter((f) => f.dataset.state).length;
    const ok = fragen.filter((f) => f.dataset.state === 'ok').length;
    score.textContent = done === 0
      ? fragen.length + ' Fragen – wähle eine Antwort und prüfe sie.'
      : ok + ' von ' + fragen.length + ' richtig'
        + (done < fragen.length ? ' (' + done + ' von ' + fragen.length + ' bearbeitet)' : '');
  };
  fragen.forEach((f) => {
    const inputs = [...f.querySelectorAll('input')];
    const check = f.querySelector('.quiz-check');
    const reveal = f.querySelector('.quiz-reveal');
    const fb = f.querySelector('.quiz-feedback');
    const exp = f.querySelector('.quiz-erklaerung');
    inputs.forEach((i) => i.addEventListener('change', () => {
      check.disabled = !inputs.some((x) => x.checked);
    }));
    const finish = (graded) => {
      let allOk = true;
      f.querySelectorAll('.quiz-opt').forEach((li) => {
        const input = li.querySelector('input');
        const corr = li.dataset.correct === '1';
        if (corr !== input.checked) allOk = false;
        if (corr) li.classList.add('opt-correct');
        else if (input.checked) li.classList.add('opt-wrong');
        input.disabled = true;
      });
      f.dataset.state = !graded ? 'shown' : (allOk ? 'ok' : 'wrong');
      fb.className = 'quiz-feedback fb-' + f.dataset.state;
      fb.textContent = !graded ? 'Lösung angezeigt.'
        : (allOk ? '✔ Richtig!' : '✘ Leider nicht ganz – die richtige Lösung ist markiert.');
      fb.hidden = false;
      exp.hidden = false;
      check.disabled = true;
      reveal.disabled = true;
      update();
    };
    check.addEventListener('click', () => finish(true));
    reveal.addEventListener('click', () => finish(false));
  });
  quiz.querySelector('.quiz-reset').addEventListener('click', () => {
    fragen.forEach((f) => {
      delete f.dataset.state;
      f.querySelectorAll('.quiz-opt').forEach((li) => li.classList.remove('opt-correct', 'opt-wrong'));
      f.querySelectorAll('input').forEach((i) => { i.checked = false; i.disabled = false; });
      f.querySelector('.quiz-check').disabled = true;
      f.querySelector('.quiz-reveal').disabled = false;
      f.querySelector('.quiz-feedback').hidden = true;
      f.querySelector('.quiz-erklaerung').hidden = true;
    });
    update();
  });
  update();
});
