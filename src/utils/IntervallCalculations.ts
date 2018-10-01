import moment from "moment";

export function isContinuous(category: categories.Single) {
  return !category.isIntervall;
}

export function isInInterval(category: categories.Single, date: Date) {
  if (isContinuous(category)) {
    return true;
  }
  return moment(category.lastUpdate).isSameOrBefore(date);
}

export function calculateIntervalls(categories: categories.CategoryMap) {
  const updatedCategories: categories.CategoryMap = {};
  Object.keys(categories).forEach(key => {
    const currCategory = categories[key];
    if (isContinuous(currCategory)) {
      updatedCategories[key] = handleEndlessIntervall(currCategory);
    } else {
      updatedCategories[key] = handleEndingIntervall(currCategory);
    }
  });
  return updatedCategories;
}

function handleEndlessIntervall(category: categories.Single) {
  const weeklyTarget = category.weeklyTarget;
  let currentTotal = category.total;
  const activeDays = category.activeDays;
  const lastUpdate = category.lastUpdate;
  const currentDay = moment().format("DD.MM.YYYY");
  if (lastUpdate === currentDay) {
    return category;
  }
  const dayCount =
    (activeDays.monday ? 1 : 0) +
    (activeDays.tuesday ? 1 : 0) +
    (activeDays.wednesday ? 1 : 0) +
    (activeDays.thursday ? 1 : 0) +
    (activeDays.friday ? 1 : 0) +
    (activeDays.saturday ? 1 : 0) +
    (activeDays.sunday ? 1 : 0);
  const hoursPerDay = parseInt(weeklyTarget) / dayCount;
  let lastChecked = moment(lastUpdate, "DD.MM.YYYY");
  do {
    lastChecked = lastChecked.add(1, "day");
    const dayOfWeek = lastChecked.format("E");
    const isActive = formatActiveDays(activeDays)[dayOfWeek];
    if (isActive) {
      currentTotal = currentTotal - hoursPerDay;
    }
  } while (lastChecked.format("DD.MM.YYYY") !== currentDay);
  return {
    ...category,
    total: currentTotal,
    lastUpdate: currentDay
  };
}
function handleEndingIntervall(category: categories.Single) {
  const lastUpdate = category.lastUpdate;
  const currentDay = moment();
  let currentTotal = category.total;
  const nextUpdate = moment(lastUpdate, "DD.MM.YYYY").add(
    //@ts-ignore - the add function expects a specific string as unit
    category.resetIntervall.amount,
    category.resetIntervall.unit
  );
  if (nextUpdate.isSameOrBefore(currentDay)) {
    currentTotal = 0;
  }
  return {
    ...category,
    total: currentTotal,
    lastUpdate: currentDay.format("DD.MM.YYYY")
  };
}
function formatActiveDays(
  activeDays: categories.ActiveDays
): { [key: string]: boolean } {
  return {
    "1": activeDays.monday,
    "2": activeDays.tuesday,
    "3": activeDays.wednesday,
    "4": activeDays.thursday,
    "5": activeDays.friday,
    "6": activeDays.saturday,
    "7": activeDays.sunday
  };
}
