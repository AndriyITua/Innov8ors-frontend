// Основний селектор для отримання стану "water"
export const selectWaterState = state => state.water;

// Селектор для отримання загального спожитого об'єму води
export const selectTotalConsumed = state => state.water.water.totalConsumed;

// Селектор для отримання добової норми води
export const selectDailyRate = state => state.water.water.dailyRate;

// Селектор для отримання записів споживання води
export const selectWaterRecords = state => state.water.water.records;

// Селектор для отримання відсотку від дейлі норми
export const selectWaterPercentage = state => state.water.water.percentage;

export const selectWaterInfo = state => state.water.monthlyData;
// Селектор для отримання кількості порцій
export const selectServingsCount = state => state.water.water.consumptionCount;

// Селектор для перевірки, чи йде зараз завантаження даних
export const selectIsLoading = state => state.water.isLoading;

// Селектор для отримання помилки (якщо вона є)
export const selectError = state => state.water.error;
