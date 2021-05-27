'''
    # 선형 회귀 분석

    - EUE에서 사용하는 데이터에 맞추어진 Linear Regression Class 입니다.
    - 기존에 진행한 가중치 값이 있는지 확인합니다.
    - 존재하지 않는 다면, 가중치를 초기화 합니다.
    - 초기화 된 가중치와 함께 linear regression을 진행합니다.
'''

import numpy as np


class LinearRegression:
    def __init__(self, train_x, train_t, weights=None, bias=None, delta=1e-4, learning_rate=0.05, err_rate=0.01):
        self.train_x = train_x.T    # (n, 10) -> (10, n)
        self.train_t = train_t.T    # (n, 01) -> (01, n)

        # weights와 bias가 존재하지 않는 경우, 초기화를 위해 bias를 대표로 확인
        if bias == None:
            # Initialize Parameters - w : (1, 10), b : float
            self.weights, self.bias = self.initialize(self.train_x)
        else:
            self.weights = weights.T    # (10, 1) -> (1, 10)
            self.bias = bias

        self.delta = delta
        self.learning_rate = learning_rate
        self.err_rate = err_rate

    def initialize(self, x):
        '''
            ### 가중치 및 편향 초기화 함수
            - Weight : (1, m) 꼴의 행렬
            - Bias : 실수
        '''
        weights = np.random.random((1, x.shape[0]))
        bias = np.random.random()
        return weights, bias

    def predict(self, x, w, b):
        '''
            ### 예측값 계산 함수
            - y_hat = x * w + b
            - (1, n) = (1, 10) * (10, n) + (1, n)
        '''
        y_predict = np.dot(w, x) + b
        return y_predict

    def cost_MAE(self, x, y, w, b):
        '''
            ### 비용 함수
            - MAE (Mean Absolute Error) : 1/n * sigma|y_i - y_hat_i|
        '''
        y_predict = self.predict(x, w, b)
        n = y_predict.shape[1]
        mae = np.sum(np.abs(y - y_predict)) / n
        return mae

    def cost_MSE(self, x, y, w, b):
        '''
            ### 비용 함수 _ MAE
            - MSE (Mean Square Error) : 1/n * sigma(y_i - y_hat_i)^2
        '''
        y_predict = self.predict(x, w, b)
        n = y_predict.shape[1]
        mse = np.sum((y - y_predict)**2) / n
        return mse

    def gradient(self, x, y, delta, w, b):
        '''
            ### 미분 함수
             - 가중치와 편향에 대한 편미분 값 반환
        '''
        loss_w_delta_plus = self.cost_MSE(x, y, w + delta, b)
        loss_w_delta_minus = self.cost_MSE(x, y, w - delta, b)
        w_grad = (loss_w_delta_plus - loss_w_delta_minus) / (2*delta)

        loss_b_delta_plus = self.cost_MSE(x, y, w, b+delta)
        loss_b_delta_minus = self.cost_MSE(x, y, w, b-delta)
        b_grad = np.sum(loss_b_delta_plus - loss_b_delta_minus) / (2*delta)

        return w_grad, b_grad

    def gradientDescent(self):
        '''
            ### 경사 하강법
            - Linear Regression Class의 주요 동작 함수 입니다.
            - 가중치와 편향을 비용함수에 넘겨준 뒤 손실을 계산합니다.
            - 가중치와 편향의 각각의 편미분 값을 계산합니다.
            - 편미분 값들과 학습률을 이용해 가중치와 편향 값을 갱신 합니다.
            - 위의 과정을 주어진 손실 값 이하가 되거나 3000번 반복 할 때 까지 반복합니다.
        '''

        iteration = 0

        w = self.weights
        b = self.bias

        while iteration <= 3000:
            loss = self.cost_MSE(self.train_x, self.train_t, w, b)

            grad_w, grad_b = self.gradient(
                self.train_x, self.train_t, self.delta, w, b)

            if iteration % 100 == 0:
                print(iteration, " iters - cost :", loss)
                print("Gradients - W :", grad_w, ", b : ", grad_b)
                print("W : ", w)
                print("b : ", b)
                print("\n")

            if loss <= self.err_rate:
                print("At iter NO.{0} stop the process.\nCost : {1}".format(
                    iteration, loss))
                break

            w = w - (self.learning_rate * grad_w)
            b = b - (self.learning_rate * grad_b)

            iteration += 1

        self.weights = w
        self.bias = b


if __name__ == "__main__":
    print("This is test set.")

    x = np.array([[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6],
                  [5, 6, 7], [6, 7, 8]], dtype=float)
    y = np.array([[2], [3], [4], [5], [6], [7]], dtype=float)
    test_model = LinearRegression(
        x, y, None, None, learning_rate=0.0005)

    print("X : ", test_model.train_x)
    print("T : ", test_model.train_t, " Shape : ", test_model.train_t.shape)
    print("W : ", test_model.weights)
    print("b : ", test_model.bias)
    print("delta : ", test_model.delta)
    print("learning rate : ", test_model.learning_rate)
    print("Error Rate : ", test_model.err_rate)

    test_model.gradientDescent()

    print("After L.R.____")
    print("* Costs *\n", test_model.cost_MSE(test_model.train_x,
                                             test_model.train_t, test_model.weights, test_model.bias))
    print("* Weights *\n", test_model.weights)
    print("* Bias *\n", test_model.bias)
