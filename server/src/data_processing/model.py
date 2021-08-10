import numpy as np
import os
import tensorflow as tf


def modeling(standard_df, host):

    n = len(standard_df)
    test_size = int(0.3 * n)
    train = standard_df[:-test_size]
    test = standard_df[-test_size:]

    def make_dataset(data, label, window_size=24):
        feature_list = []
        label_list = []
        for i in range(len(data) - (window_size+3)):
            feature_list.append(np.array(data.iloc[i:i+window_size]))
            label_list.append(
                np.array(label.iloc[i + window_size:i + window_size + 3]))
        return np.array(feature_list), np.array(label_list)

    feature_cols = ['temp_out', 'humi_out', 'press',
                    'wind_speed', 'Day sin', 'Day cos', 'Year sin', 'Year cos']
    label_cols = ['temp_out']

    train_feature = train[feature_cols]
    train_label = train[label_cols]

    test_feature = test[feature_cols]
    test_label = test[label_cols]

    train_feature, train_label = make_dataset(
        train_feature, train_label, window_size=6)
    test_feature, test_label = make_dataset(
        test_feature, test_label, window_size=6)

    model = tf.keras.Sequential([
        tf.keras.layers.LSTM(16,
                             return_sequences=False,
                             input_shape=(6, 8)),
        tf.keras.layers.Dense(3)
    ])

    model.compile(loss='mse', optimizer='adam')
    model.fit(train_feature, train_label, epochs=50, batch_size=10)

    model.save(os.getcwd() +
               '/src/data_processing/models/{0}/model.h5'.format(host))
