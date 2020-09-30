import os
import csv

#path to csv file
csvpath = os.path.join("Resources/budget_data.csv")

#Declare variables
total_months = 0
total_revenue = 0
changes = []
date_count = []
greatest_inc = 0
greatest_inc_month = 0
greatest_dec = 0
greatest_dec_month = 0

#open csv
with open(csvpath, newline = '') as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ',')
    next(csvreader, None)
    row = next(csvreader)

#calculate number of months and revenue in total
    previous_profit = int(row[1])
    total_months = total_months + 1
    total_revenue = total_revenue + int(row[1])
    greatest_inc = int(row[1])
    greatest_inc_month = row[0]

    for row in csvreader:
        total_months = total_months + 1
        total_revenue = total_revenue + int(row[1])

    #calc change from this month to prev month
        change = int(row[1]) - previous_profit
        changes.append(change)
        previous_profit = int(row[1])
        date_count.append(row[0])

        #Calculating greatest increase
        if int(row[1]) > greatest_inc:
            greatest_inc = int(row[1])
            greatest_inc_month = row[0]

        #calc greatest dec
        if int(row[1]) < greatest_dec:
            greatest_dec = int(row[1])
            greatest_dec_month = row[0]

    #calc average and date
    average_change = sum(changes)/len(changes)

    high = max(changes)
    low = min(changes)

    #print values
    print("Financial Analysis")
    print("--------------------------")
    print("Total Months:" + str(total_months))
    print("Total Amount:" + str(total_revenue))
    print(average_change)
    print("Greatest Increase in Profits: " + greatest_inc_month, max(changes))
    print("Greatest Decrease in Profits: " + greatest_dec_month, min(changes))


#Copy output file
    PyBank = open("Analysis.txt","w+")
    PyBank.write("Financial Analysis") 
    PyBank.write('\n' +"Total Months" + str(total_months)) 
    PyBank.write('\n' +"Total Amount" + str(total_revenue)) 
    PyBank.write('\n' +"Average" + str(average_change)) 
    PyBank.write('\n' +"Greatest Increase: " + greatest_inc_month)
    PyBank.write('\n' +str(high))
    PyBank.write('\n' +"Greatest Decrease: " + greatest_dec_month) 
    PyBank.write('\n' +str(low))  