#add jsonlab functions to path
addpath("./src/OCTAVE/jsonlab");
#just to make sure clear the workspace
clear all
#exec users code
source('./src/OCTAVE/user-code.m');
#TODO: Check with tim if theres an easier way to ref workspace,
#save workspace to file
save("./src/OCTAVE/wkspc.mat");
#load workspace file to var
S = load("./src/OCTAVE/wkspc.mat");
#save "workspace" as json value in file
j = savejson('', S, './src/OCTAVE/jsondata');
