import sys
import json
import pandas as pd



def read_in():
    input = sys.stdin.readlines()

    return json.loads(input[0])
    # return {"height":"15", "weight":"21", "shoeSize":"31"};


def main():
    input = read_in()

    height = float(input["height"])
    weight = float(input["weight"])
    shoeSize = float(input["shoeSize"])

    result = classification(height, weight, shoeSize)

    print(result)


def classification(height, weight, shoeSize):
    df = pd.read_csv('dataset.csv')
    Gender = df['Sex'].values
    Height=df['Height'].values
    Weight=df['Weight'].values
    Foot_Size=df['ShoeSize'].values
    
    pHeight = height
    pWeight = weight
    pFoot_Size = shoeSize

    total_male = 0
    total_female = 0
    for i in Gender[:]:
        if (i == 'male'):
            total_male += 1
        if (i == 'female'):
            total_female += 1

    total_people = len(Gender)

    # number of male divided by total people
    P_male = total_male / total_people
    P_female = total_female / total_people

    # male height mean
    sum = 0
    male_Height_mean = 0
    indices = [i for i, x in enumerate(Gender) if x == "male"]

    for i in indices[:]:
        sum += Height[i]
    male_Height_mean = sum / len(indices)

    # male weight mean
    sum = 0
    # indices = [i for i, x in enumerate(Gender) if x == "male"]         not needed
    for i in indices[:]:
        sum += Weight[i]
    male_Weight_mean = sum / len(indices)

    # male FootSize mean
    sum = 0
    # indices = [i for i, x in enumerate(Gender) if x == "male"]
    for i in indices[:]:
        sum += Foot_Size[i]
    male_footSize_mean = sum / len(indices)

    # male height variance
    var = 0
    for i in indices[:]:
        var += (male_Height_mean - Height[i]) ** 2
    male_Height_variance = var

    # male weight variance
    var = 0
    for i in indices[:]:
        var += (male_Weight_mean - Weight[i]) ** 2
    male_Weight_variance = var

    # male FootSize variance
    var = 0
    for i in indices[:]:
        var += (male_footSize_mean - Foot_Size[i]) ** 2
    male_footSize_variance = var

    # mean and variance for female

    # female height mean
    sum = 0
    female_Height_mean = 0
    indices = [i for i, x in enumerate(Gender) if x == "female"]

    for i in indices[:]:
        sum += Height[i]
    female_Height_mean = sum / len(indices)

    # female weight mean
    sum = 0
    # indices = [i for i, x in enumerate(Gender) if x == "male"]         not needed
    for i in indices[:]:
        sum += Weight[i]
    female_Weight_mean = sum / len(indices)

    # female FootSize mean
    sum = 0
    # indices = [i for i, x in enumerate(Gender) if x == "male"]
    for i in indices[:]:
        sum += Foot_Size[i]
    female_footSize_mean = sum / len(indices)

    # female height variance
    var = 0
    for i in indices[:]:
        var += (female_Height_mean - Height[i]) ** 2
    female_Height_variance = var

    # female weight variance
    var = 0
    for i in indices[:]:
        var += (female_Weight_mean - Weight[i]) ** 2
    female_Weight_variance = var

    # female FootSize variance
    var = 0
    for i in indices[:]:
        var += (female_footSize_mean - Foot_Size[i]) ** 2
    female_footSize_variance = var

    def p_x_given_y(x, mean_y, variance_y):
        # Input the arguments into a probability density function
        # pi = 3.141592653589793
        # e = 2.718281828459045
        p = 1 / ((2 * 3.141592653589793 * variance_y) ** 0.5) * 2.718281828459045 ** ((-(x - mean_y) ** 2) / (2 * variance_y))

        # return p
        return p

    postMale = P_male * p_x_given_y(pHeight, male_Height_mean, male_Height_variance) * p_x_given_y(pWeight, male_Weight_mean, male_Weight_variance) * p_x_given_y(pFoot_Size, male_footSize_mean, male_footSize_variance)

    postFemale = P_female * p_x_given_y(pHeight, female_Height_mean, female_Height_variance) * p_x_given_y(pWeight, female_Weight_mean, female_Weight_variance) * p_x_given_y(pFoot_Size, female_footSize_mean, female_footSize_variance)

    # applying softmax transform

    #postMale = (2.718281828459045 ** (postMale) / (2.718281828459045 ** (postMale) + 2.718281828459045 ** (postFemale))) * 100
    #postFemale = (2.718281828459045 ** (postFemale) / (2.718281828459045 ** (postMale) + 2.718281828459045 ** (postFemale))) * 100

    postFemale = postFemale / (postFemale + postMale)
    postMale = postMale / (postMale + postFemale)

    #normalising the data w.r.t each other

    final_postFemale = (postFemale / (postFemale + postMale))*100
    final_postMale = (postMale / (postMale + postFemale))*100

    Percentage = round(final_postMale,3) if (final_postMale > final_postFemale) else round(final_postFemale,3)
    Sex = "Male" if (final_postMale > final_postFemale) else "Female"

    result = json.dumps({"Sex": Sex, "Percentage": Percentage})
    return result


if __name__ == '__main__':
    main()
