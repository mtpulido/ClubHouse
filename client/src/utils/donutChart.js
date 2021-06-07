export const populateScoring = (userRounds) => {
  let array = [0, 0, 0, 0, 0];
  userRounds?.map((round, index) => {
    if (round.score >= 100) {
      array[0] += 1;
    } else if (round.score >= 90) {
      array[1] += 1;
    } else if (round.score >= 80) {
      array[2] += 1;
    } else if (round.score >= 70) {
      array[3] += 1;
    } else if (round.score >= 60) {
      array[4] += 1;
    }
  });
  return array;
};

export const populateDriving = (userRounds) => {
  let array = [0, 0, 0, 0, 0];
  userRounds?.map((round, index) => {
    if (round.fairwaysHit / round.possibleFairways < 0.15) {
      array[0] += 1;
    } else if (round.fairwaysHit / round.possibleFairways <= 0.3) {
      array[1] += 1;
    } else if (round.fairwaysHit / round.possibleFairways <= 0.45) {
      array[2] += 1;
    } else if (round.fairwaysHit / round.possibleFairways <= 0.6) {
      array[3] += 1;
    } else if (round.fairwaysHit / round.possibleFairways > 0.6) {
      array[4] += 1;
    }
  });
  return array;
};

export const populateGreens = (userRounds) => {
  let array = [0, 0, 0, 0, 0];
  userRounds?.map((round, index) => {
    if (round.greens / round.holes < 0.15) {
      array[0] += 1;
    } else if (round.greens / round.holes <= 0.3) {
      array[1] += 1;
    } else if (round.greens / round.holes <= 0.45) {
      array[2] += 1;
    } else if (round.greens / round.holes <= 0.65) {
      array[3] += 1;
    } else if (round.greens / round.holes > 0.65) {
      array[4] += 1;
    }
  });
  return array;
};

export const populatePutting = (userRounds) => {
  let array = [0, 0, 0, 0, 0];
  userRounds?.map((round, index) => {
    if (round.putts <= 30) {
      array[4] += 1;
    } else if (round.putts <= 34) {
      array[3] += 1;
    } else if (round.putts <= 39) {
      array[2] += 1;
    } else if (round.putts <= 44) {
      array[1] += 1;
    } else if (round.putts >= 45) {
      array[0] += 1;
    }
  });
  return array;
};
