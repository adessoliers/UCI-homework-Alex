import os
import csv

#path to csv file
csvpath = os.path.join("Resources/election_data.csv")

#declare variables
total_votes = 0
khan_votes = 0
correy_votes = 0
li_votes = 0
otooley_votes = 0

#Open and read csv file
with open(csvpath, newline='') as csvfile:
    
    #Csv reader specify delims and var contents
    csvreader = csv.reader(csvfile, delimiter=',')

    #read the header row first
    csv_header = next(csvfile)

    #read each row of data after header
    for row in csvreader:

        #calc total # of votes cast
        total_votes += 1

         #calc total # of votes each candidate won
        if (row[2] == "Khan"):
             khan_votes += 1
        elif (row[2] == "Correy"):
            correy_votes += 1
        elif (row[2] == "Li"):
            li_votes += 1
        else:
            otooley_votes += 1

    #calc percent votes each candidate won
    khan_percent = khan_votes / total_votes
    correy_percent = correy_votes / total_votes
    li_percent = li_votes / total_votes
    otooley_percent = otooley_votes / total_votes

    #calc winner of election based on pop vote
    winner = max(khan_votes, correy_votes, li_votes, otooley_votes)

    if winner == khan_votes:
        winner_name = "Khan"
    elif winner == correy_votes:
        winner_name = "Correy"
    elif winner == li_votes:
        winner_name = "Li"
    else:
        winner_name = "O Tooley"

#PRINT ANALYSIS
print(f"Election Results")
print("--------------------")
print(f"Total Votes: {total_votes}")
print("--------------------")
print(f"Khan: {khan_percent:.3%} ({khan_votes})")
print(f"Correy: {correy_percent:.3%} ({correy_votes})")
print(f"Li: {li_percent:.3%} ({li_votes})")
print(f"O'Tooley: {otooley_percent:.3%} ({otooley_votes})")
print("--------------------")
print(f"Winner: {winner_name}")
print("--------------------")

#speicy file to write
output_file = os.path.join("Analysis/Election_Data_Analysis.txt")

#open file using write. specify variables to hold contents
with open(output_file, 'w',) as txtfile:

#write new data
    txtfile.write(f"Election Results\n")
    txtfile.write(f"------------------------\n")
    txtfile.write(f"Total Votes: {total_votes}\n")
    txtfile.write(f"------------------------\n")
    txtfile.write(f"Khan: {khan_percent:.3%} ({khan_votes})\n")
    txtfile.write(f"Correy: {correy_percent:.3%} ({correy_votes})\n")
    txtfile.write(f"O'Tooley: {otooley_percent:.3%} ({otooley_votes})\n")
    txtfile.write(f"------------------------\n")
    txtfile.write(f"Winner: {winner_name}\n")
    txtfile.write(f"------------------------\n")